// https://developers.google.com/analytics/devguides/config/mgmt/v3/mgmtReference/management/filters
class FilterAdmin {

  public settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  public createValidHostnameFilter(name: string) {

    var site = this.settings.Site.toLowerCase().replace(".", "\\.");

    var filter = {
      name: name,
      accountId: this.settings.AccountId,
      includeDetails: {
        field: "PAGE_HOSTNAME",
        expressionValue: site,
        matchType: "MATCHES",
        caseSensitive: false,
        kind: "analytics#filterExpression"
      },
      type: "INCLUDE",
      kind: "analytics#filter"
    }

    return this.createFilter(filter);
  }

  public createCampaignSourceExcludeFilter(name: string, expressionValue: string) {

    var filter = {
      name: name,
      accountId: this.settings.AccountId,
      excludeDetails: {
        field: "CAMPAIGN_SOURCE",
        expressionValue: expressionValue,
        matchType: "MATCHES",
        caseSensitive: false,
        kind: "analytics#filterExpression"
      },
      type: "EXCLUDE",
      kind: "analytics#filter"
    };

    return this.createFilter(filter);
  }

  public createIspOrganizationExcludeFilter(name: string, expressionValue: string) {

    var filter = {
      name: name,
      accountId: this.settings.AccountId,
      excludeDetails: {
        field: "GEO_ORGANIZATION",
        expressionValue: expressionValue,
        matchType: "MATCHES",
        caseSensitive: false,
        kind: "analytics#filterExpression"
      },
      type: "EXCLUDE",
      kind: "analytics#filter"
    };

    return this.createFilter(filter);
  }

  public createIpAddressExcludeFilter(name: string, expressionValue: string) {

    var filter = {
      name: name,
      accountId: this.settings.AccountId,
      excludeDetails: {
        field: "GEO_IP_ADDRESS",
        expressionValue: expressionValue,
        matchType: "MATCHES",
        caseSensitive: false,
        kind: "analytics#filterExpression"
      },
      type: "EXCLUDE",
      kind: "analytics#filter"
    };

    return this.createFilter(filter);
  }

  public createLowercaseFilter(name: string, field: string) {
    var filter = {
      name: name,
      accountId: this.settings.AccountId,
      lowercaseDetails: {
        field: field,
      },
      type: "LOWERCASE",
      kind: "analytics#filter"
    };

    return this.createFilter(filter);
  }

  public createFilter(filter: any) {

    try {
      filter = Analytics.Management.Filters.insert(filter, this.settings.AccountId);

      var link = Analytics.Management.ProfileFilterLinks.insert({
        filterRef: {
          id: filter.id
        }
      }, this.settings.AccountId, this.settings.PropertyId, this.settings.ViewId);

      toast(filter.name, "Created Filter");

      Logger.log('Created filter: "%s"', filter);

      return filter;
    } catch (ex) {
      Logger.log(filter);
      throw ex;
    }
  }

  public deleteFilters(nameFragment: string) {

    try {

      var existingFilters = this.getMatchingFilters(nameFragment);

      for (var i = 0; i < existingFilters.length; i++) {

        var filter = existingFilters[i]

        Analytics.Management.Filters.remove(this.settings.AccountId, filter.id);

        toast(filter.name, "Removed Filter");

        Logger.log('Deleted filter Id: "%s". Name: "%s".', filter.id, filter.name);

        // Quick sleep to get around quota for writes / sec
        Utilities.sleep(1000);

      }
    } catch (ex) {
      Logger.log(ex);
      throw ex;
    }
  }

  public createFiltersForList(list: any[] | string[], name: string,
    create: {
      (filterName: string, expressionValue: string): void;
      (filterName: string, expressionValue: string): void;
    }) {
    var expressionValue = "";
    var filterNumber = 1;
    var filterName = name + " " + ((filterNumber < 10) ? "0" + filterNumber : filterNumber);

    // Loop through list and create filters
    for (var i = 0; i < list.length; i++) {

      if (list[i].length > 0) {
        if (expressionValue == "") {
          expressionValue = list[i];
        } else {

          // Expression can't exceed 255 chars so if we've hit that create a filter with what we have so far and move on.
          if ((expressionValue + "|" + list[i]).length > 255) {

            var filter = this.create(filterName, expressionValue, create);

            expressionValue = "";
            filterNumber++;
            filterName = name + " " + ((filterNumber < 10) ? "0" + filterNumber : filterNumber);

            // Quick sleep to get around quota for writes / sec
            Utilities.sleep(1000);

          } else {
            expressionValue = expressionValue + "|" + list[i];
          }
        }
      }
    }

    // Write the last expression if there is one.
    if (expressionValue.length > 1) {
      var filter = this.create(filterName, expressionValue, create);
    }
  }

  private create(filterName: string, expressionValue: any, create: any) {

    switch (create) {
      case this.createCampaignSourceExcludeFilter:
        this.createCampaignSourceExcludeFilter(filterName, expressionValue);
        break;
      case this.createIpAddressExcludeFilter:
        this.createIpAddressExcludeFilter(filterName, expressionValue);
        break;
      case this.createIspOrganizationExcludeFilter:
        this.createIspOrganizationExcludeFilter(filterName, expressionValue);
        break;
      default:
        throw "Unknown FilterAdmin function name: " + create;
    }
  }

  public getFilter(name: string) {
    var results = Analytics.Management.Filters.list(this.settings.AccountId);

    if (results && !results.error) {

      for (var i = 0, filter: { name: any; }; filter = results.items[i]; i++) {
        if (filter.name == name) {
          return filter;
        }
      }
      return null;
    } else {
      throw results.error;
    }
  }

  public getMatchingFilters(name: any) {

    var matches = [];

    var results = Analytics.Management.Filters.list(this.settings.AccountId);

    if (results && !results.error) {

      for (var i = 0, filter: { name: { indexOf: (arg0: any) => number; }; }; filter = results.items[i]; i++) {
        if (filter.name.indexOf(name) > -1) {
          matches.push(filter)
        }
      }
    } else {
      throw results.error;
    }
    return matches;
  }

}
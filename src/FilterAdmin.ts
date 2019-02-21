// https://developers.google.com/analytics/devguides/config/mgmt/v3/mgmtReference/management/filters
class FilterAdmin {

  public Settings: Settings;

  constructor(settings: Settings) {
    this.Settings = settings;
  }

  public createCampaignSourceExcludeFilter(name: any, expressionValue: any) {

    var filter = {
      name: name,
      accountId: this.Settings.AccountId,
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
      accountId: this.Settings.AccountId,
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

  public createIpAddressExcludeFilter(name: any, expressionValue: any) {

    var filter = {
      name: name,
      accountId: this.Settings.AccountId,
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

  public createFilter(filter: any) {

    try {
      filter = Analytics.Management.Filters.insert(filter, this.Settings.AccountId);

      var link = Analytics.Management.ProfileFilterLinks.insert({
        filterRef: {
          id: filter.id
        }
      }, this.Settings.AccountId, this.Settings.PropertyId, this.Settings.ViewId);

      toast(filter.name, "Created Filter");

      Logger.log('Created filter Id: "%s". Name: "%s". Value: "%s"', filter.id, filter.name, filter.excludeDetails.expressionValue);

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

        Analytics.Management.Filters.remove(this.Settings.AccountId, filter.id);

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

            var filter = create(filterName, expressionValue)

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
      var filter = create(name, expressionValue);
    }
  }

  public getFilter(name: string) {
    var results = Analytics.Management.Filters.list(this.Settings.AccountId);

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

    var results = Analytics.Management.Filters.list(this.Settings.AccountId);

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
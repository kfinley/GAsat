// https://developers.google.com/analytics/devguides/config/mgmt/v3/mgmtReference/management/filters

function createCampaignSourceExcludeFilter(propertyId, viewId, name, accountId, expressionValue) {

  var filter = {
    name: name,
    accountId: accountId,
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

  return createFilter(accountId, propertyId, viewId, filter);
}

function createIspOrganizationExcludeFilter(propertyId, viewId, name, accountId, expressionValue) {

  var filter = {
    name: name,
    accountId: accountId,
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

  return createFilter(accountId, propertyId, viewId, filter);
}

function createIpAddressExcludeFilter(propertyId, viewId, name, accountId, expressionValue) {

  var filter = {
    name: name,
    accountId: accountId,
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

  return createFilter(accountId, propertyId, viewId, filter);
}

function createFilter(accountId, propertyId, viewId, filter) {

  try {
    filter = Analytics.Management.Filters.insert(filter, accountId);

    var link = Analytics.Management.ProfileFilterLinks.insert({ filterRef: { id: filter.id } }, accountId, propertyId, viewId);

    toast(filter.name, "Created Filter");

    Logger.log('Created filter Id: "%s". Name: "%s". Value: "%s"', filter.id, filter.name, filter.excludeDetails.expressionValue);

    return filter;
  } catch (ex) {
    Logger.log(filter);
    throw ex;
  }
}

function deleteFilters(accountId, nameFragment) {

  try {

    var existingFilters = getMatchingFilters(accountId, nameFragment);

    for (var i = 0; i < existingFilters.length; i++) {

      var filter = existingFilters[i]

      Analytics.Management.Filters.remove(accountId, filter.id);

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

function createFiltersForList(list, name, propertyId, viewId, accountId, create) {
  var expressionValue = "";
  var filterNumber = 1;

  // Loop through list and create filters
  for (var i = 0; i < list.length; i++) {

    if (list[i].length > 0) {
      if (expressionValue == "") {
        expressionValue = list[i];
      } else {

        // Expression can't exceed 255 chars so if we've hit that create a filter with what we have so far and move on.
        if ((expressionValue + "|" + list[i]).length > 255) {

          name = name + " " + ((filterNumber < 10) ? "0" + filterNumber : filterNumber);

          var filter = create(propertyId, viewId, name, accountId, expressionValue)

          expressionValue = "";
          filterNumber++;

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
    var filter = create(propertyId, viewId, name, accountId, expressionValue);
  }
}

function getFilter(accountId, name) {
  var results = Analytics.Management.Filters.list(accountId);

  if (results && !results.error) {

    for (var i = 0, filter; filter = results.items[i]; i++) {
      if (filter.name == name) {
        return filter;
      }
    }
    return null;
  } else {
    throw results.error;
  }
}

function getMatchingFilters(accountId, name) {

  var matches = [];

  var results = Analytics.Management.Filters.list(accountId);
  
  if (results && !results.error) {

    for (var i = 0, filter; filter = results.items[i]; i++) {
      if (filter.name.indexOf(name) > -1) {
        matches.push(filter)
      }
    }
  } else {
    throw results.error;
  }
  return matches;
}


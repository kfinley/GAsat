// https://developers.google.com/analytics/devguides/config/mgmt/v3/mgmtReference/management/filters

function createCampaignSourceExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue) {
  
  try {
    
    var filter = {name: name,
                  accountId: accountId, 
                  excludeDetails: {field: "CAMPAIGN_SOURCE", 
                                   expressionValue: expressionValue, 
                                   matchType: "MATCHES", 
                                   caseSensitive: false, 
                                   kind: "analytics#filterExpression"}, 
                  type : "EXCLUDE", 
                  kind: "analytics#filter"};
    
    return createFilter(accountId, propertyId, viewId, filter);
    
  } catch (ex) {
    Logger.log(ex);
    throw ex;
  }
}

function createIspOrganizationExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue) {
  
  try {
    
    var filter = {name: name,
                  accountId: accountId, 
                  excludeDetails: {field: "GEO_ORGANIZATION", 
                                   expressionValue: expressionValue, 
                                   matchType: "MATCHES", 
                                   caseSensitive: false, 
                                   kind: "analytics#filterExpression"}, 
                  type : "EXCLUDE", 
                  kind: "analytics#filter"};
    
    return createFilter(accountId, propertyId, viewId, filter);
    
  } catch (ex) {
    Logger.log(ex);
    throw ex;
  }
}

function createFilter(accountId, propertyId, viewId, filter) {
  
  try {
    filter = Analytics.Management.Filters.insert(filter, accountId);
    
    var link = Analytics.Management.ProfileFilterLinks.insert({filterRef: {id: filter.id}}, accountId, propertyId, viewId);
    
    toast(filter.name, "Created Filter");
    
    Logger.log('Created filter Id: "%s". Name: "%s". Value: "%s"', filter.id, filter.name, filter.excludeDetails.expressionValue);
    
    return filter;
  } catch (ex) {
    Logger.log(filter);
    throw ex;
  }
}

function filterExists(accountId, name) {
  var results = Analytics.Management.Filters.list(accountId);
  
  if (results && !results.error) {
    
    for (var i = 0, filter; filter = results.items[i]; i++) {
      if (filter.name == name) {
        return true;
      }
    }
    return false;
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



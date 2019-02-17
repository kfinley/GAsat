// https://developers.google.com/analytics/devguides/config/mgmt/v3/mgmtReference/management/filters

function createCampaignSourceExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue) {
  return createCampaignSourceExcludeFilter(site, propertyId, viewId, name, accountId, null);
}

function createCampaignSourceExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue, outputSheet) {

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
    
    return createFilter(accountId, propertyId, viewId, filter, outputSheet);

  } catch (ex) {
     Logger.log(ex);
     throw ex;
  }
}

function createIspOrganizationFilter(site, propertyId, viewId, name, accountId, expressionValue) {
    return createIspOrganizationFilter(site, propertyId, viewId, name, accountId, expressionValue, null);
}

function createIspOrganizationExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue, outputSheet) {

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
        
        return createFilter(accountId, propertyId, viewId, filter, outputSheet);

    } catch (ex) {
        Logger.log(ex);
        throw ex;
    }
}

function createFilter(accountId, propertyId, viewId, filter, outputSheet) {

    filter = Analytics.Management.Filters.insert(filter, accountId);
    
    var link = Analytics.Management.ProfileFilterLinks.insert({filterRef: {id: filter.id}}, accountId, propertyId, viewId);
    
    if (outputSheet != undefined) {
     
      outputSheet.getRange(filterNumber+1, 1).setValue(filter.name);
      outputSheet.getRange(filterNumber+1, 2).setValue(filter.id);
      outputSheet.getRange(filterNumber+1, 3).setValue(filter.excludeDetails.expressionValue);
      
    }
    
    toast(filter.name, "Created Filter");
    
    Logger.log('Created filter Id: "%s". Name: "%s". Value: "%s"', filter.id, filter.name, filter.excludeDetails.expressionValue);
    
    return filter;
}

function filterExists(accountId, name) {
  var results = Analytics.Management.Filters.list(accountId);
  
  if (results && !results.error) {
    
    var filters = results.items;
    
    for (var i = 0, filter; filter = filters[i]; i++) {
      if (filter.name == name) {
        return true;
      }
    }
  }
  return false;
}
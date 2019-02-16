function deleteSpamReferrerFiltersForSite() {
 
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var site = settings.getRange(1, 2).getValue();
  var accountId = settings.getRange(2, 2).getValue();
  var propertyId = settings.getRange(3, 2).getValue();
  var viewId = settings.getRange(4, 2).getValue();
  
  // Delete any old filters
  toast("Deleting existing Filters for " + site);
  deleteSpamReferrerFilters(site);
}


function deleteSpamReferrerFilters(site) {
  
  try {
    var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
    var accountId = settings.getRange(2, 2).getValue();

    var outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(site + " - Referrer Spam Output");
  
    // Get the data from the sheet
    var numRows = outputSheet.getDataRange().getNumRows();
    var dataValues = outputSheet.getDataRange().getValues();
    
    // Loop through Sheet
    for(var i=1; i < numRows; i++){
      
      var filterId = dataValues[i][1];
      if (filterId != null) {
        toast("accountId: " + accountId + " filterId: " + filterId);
        
        Analytics.Management.Filters.remove(accountId, filterId);
        
        toast("Removed");
        
        Logger.log('Deleted filter Id: "%s". Name: "%s".', filterId.id, dataValues[i][0]);
        
        outputSheet.getRange(i+1, 1).setValue("");
        outputSheet.getRange(i+1, 2).setValue("");
        outputSheet.getRange(i+1, 3).setValue("");
      }
    }  
  } catch (ex) {
    Logger.log(ex);
    throw ex;
  } 
}

function createSpamReferrerFilters() {
  
  try {
    
    var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
    var site = settings.getRange(1, 2).getValue();
    var accountId = settings.getRange(2, 2).getValue();
    var propertyId = settings.getRange(3, 2).getValue();
    var viewId = settings.getRange(4, 2).getValue();
    
    // Delete any old filters
    toast("Deleting existing Filters for " + site);
    deleteSpamReferrerFilters(site);
    
    toast("Creating Filters for " + site);
    
    // Open the Referrer Spam List from github
    var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/piwik/referrer-spam-blacklist/master/spammers.txt"); 
    var referrers = response.getContentText().split("\n");//.replace(/\./g, "\\.").split("\n");
    
    var additionalSpammers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Additional Spammers");
    
    // Get the data from the sheet
    var numRows = additionalSpammers.getDataRange().getNumRows();
    var dataValues = additionalSpammers.getDataRange().getValues();
    
    // Loop through Sheet
    for(var i=1; i <= numRows; i++){
      referrers.push(additionalSpammers.getRange(i, 1).getValue());//.replace(/\./g, "\\."));
    }
    
    var expressionValue = "";
    var filterNumber = 1;
    
    // Loop through referrers and create filters
    for(var i=0; i < referrers.length; i++){
      
      if(referrers[i].length > 0) {
        if (expressionValue == "") {
          expressionValue = referrers[i];
        } else {
          
          // Expression can't exceed 255 chars so if we've hit that create a filter with what we have so far and move on.
          if ((expressionValue + "|" + referrers[i]).length > 255) {
            
            var filter = createFilter(site, filterNumber, accountId, propertyId, viewId, expressionValue);
            
            expressionValue = "";
            filterNumber++;
            
            // Quick sleep to get around quota for writes / sec
            Utilities.sleep(1000);
            
          } else {
            expressionValue = expressionValue + "|" + referrers[i];
          }
        }
      }
    }
    
    // Write the last expression if there is one. Probably always will be but still good to check.
    if (expressionValue.length > 1) {
      var filter = createFilter(site, filterNumber, accountId, propertyId, viewId, expressionValue);
    }
    
    settings.getRange(5, 2).setValue(new Date());
    
    SpreadsheetApp.getActive().toast("Finished!");
   } catch (ex) {
    Logger.log(ex);
    throw ex;
  }
}

function createFilter(site, filterNumber, accountId, propertyId, viewId, expressionValue) {

  try {
    var outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(site + " - Referrer Spam Output");
    
    var name = "Referrer Spam " + ((filterNumber < 10) ? "0"+filterNumber : filterNumber);
    
    var filter = {name: name,
                  accountId: accountId, 
                  excludeDetails: {field: "CAMPAIGN_SOURCE", 
                                   expressionValue: expressionValue, 
                                   matchType: "MATCHES", 
                                   caseSensitive: false, 
                                   kind: "analytics#filterExpression"}, 
                  type : "EXCLUDE", 
                  kind: "analytics#filter"};
    
    filter = Analytics.Management.Filters.insert(filter, accountId);
    
    var link = Analytics.Management.ProfileFilterLinks.insert({filterRef: {id: filter.id}}, accountId, propertyId, viewId);
    
    outputSheet.getRange(filterNumber+1, 1).setValue(filter.name);
    outputSheet.getRange(filterNumber+1, 2).setValue(filter.id);
    outputSheet.getRange(filterNumber+1, 3).setValue(expressionValue);
    
    SpreadsheetApp.getActive().toast(filter.name, "Created Filter");
    
    Logger.log('Created filter Id: "%s". Name: "%s". Value: "%s"', filter.id, filter.name, filter.excludeDetails.expressionValue);
    
    return filter;
  } catch (ex) {
     Logger.log(ex);
     throw ex;
  }
}

function toast(message) {
 SpreadsheetApp.getActive().toast(message); 
}
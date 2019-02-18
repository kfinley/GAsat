function deleteSpamReferrerFiltersForSite() {
  
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var site = settings.getRange(1, 2).getValue();
  var accountId = settings.getRange(2, 2).getValue();
  var propertyId = settings.getRange(3, 2).getValue();
  var viewId = settings.getRange(4, 2).getValue();
  
  // Delete any old filters
  toast("Site: " + site, "Deleting Existing Filters");
  deleteSpamReferrerFilters(accountId);
  toast("Site: " + site, "Finished Deleting Existing Filters");
}


function deleteSpamReferrerFilters(accountId) {
  
  try {
    
    var existingFilters = getMatchingFilters(accountId, "Referrer Spam");
    
    for(var i=0; i < existingFilters.length; i++){
      
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

function createSpamReferrerFilters() {
  
  try {
    
    var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
    var site = settings.getRange(1, 2).getValue();
    var accountId = settings.getRange(2, 2).getValue();
    var propertyId = settings.getRange(3, 2).getValue();
    var viewId = settings.getRange(4, 2).getValue();
    
    // Delete any old filters
    toast("Site: " + site, "Deleting Existing Filters");
    deleteSpamReferrerFilters(accountId);
    
    toast("Site: " + site, "Creating Filters");
    
    // Open the Referrer Spam List from github
    var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/piwik/referrer-spam-blacklist/master/spammers.txt"); 
    var referrers = response.getContentText().split("\n");
    
    var additionalSpammers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Additional Spammers");
    
    // Get the data from the sheet
    var numRows = additionalSpammers.getDataRange().getNumRows();
    var dataValues = additionalSpammers.getDataRange().getValues();
    
    // Loop through Sheet
    for(var i=1; i <= numRows; i++){
      referrers.push(additionalSpammers.getRange(i, 1).getValue());
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
            
            var name = "Referrer Spam " + ((filterNumber < 10) ? "0" + filterNumber : filterNumber);
            
            var filter = createCampaignSourceExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue)
            
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
      var filter = createCampaignSourceExcludeFilter(site, propertyId, viewId, name, accountId, expressionValue);
    }
    
    settings.getRange(5, 2).setValue(new Date());
    
    toast("Finished!");
  } catch (ex) {
    Logger.log(ex);    
    throw ex;
  }
}


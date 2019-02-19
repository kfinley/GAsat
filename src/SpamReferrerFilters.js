function deleteSpamReferrerFilters() {
  
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var site = settings.getRange(1, 2).getValue();
  var accountId = settings.getRange(2, 2).getValue();
  
  // Delete any old filters
  toast("Site: " + site, "Deleting Existing Filters");
  deleteFilters(accountId);
  toast("Site: " + site, "Finished Deleting Existing Filters");
}

function createSpamReferrerFilters() {
  
  try {
    
    var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
    var site = settings.getRange(1, 2).getValue();
    var accountId = settings.getRange(2, 2).getValue();
    var propertyId = settings.getRange(3, 2).getValue();
    var viewId = settings.getRange(4, 2).getValue();
    
    // Delete any old filters
    toast("Site: " + site, "Deleting Existing Spam Filters");
    deleteFilters(accountId, "Referrer Spam");
    
    toast("Site: " + site, "Creating Spam Filters");
    
    // Open the Referrer Spam List from github
    var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/piwik/referrer-spam-blacklist/master/spammers.txt"); 
    var referrers = response.getContentText().split("\n");
    
    var additionalSpammers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Additional Spammers");
    
    // Get the data from the sheet
    var numRows = additionalSpammers.getDataRange().getNumRows();
    
    // Loop through Sheet
    for(var i=2; i <= numRows; i++){
      referrers.push(additionalSpammers.getRange(i, 1).getValue());
    }
    
    createFiltersForList(referrers, "Referrer Spam", propertyId, viewId, accountId, createCampaignSourceExcludeFilter);

    toast("Finished!", "Spam Referrer Filters");
  } catch (ex) {
    Logger.log(ex);    
    throw ex;
  }
}

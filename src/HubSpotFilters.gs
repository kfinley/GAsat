function createHubSpotFilters() {
  
  var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var site = settings.getRange(1, 2).getValue();
  var accountId = settings.getRange(2, 2).getValue();
  var propertyId = settings.getRange(3, 2).getValue();
  var viewId = settings.getRange(4, 2).getValue();
  
  toast("site: " + site, "Creating HubSpot Filters");

  var name = "HubSpot ISP Filter";
  
  if (filterExists(accountId, name) == false ) {
    
    var filter = createIspOrganizationExcludeFilter(site, propertyId, viewId, name, accountId, "HubSpot");
    
    toast(name, "Created");
 
  }
  
  toast("Finished!");
}
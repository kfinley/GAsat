
function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  var hubSpotMenu = ui.createMenu("HubSpot");
  
  hubSpotMenu
  .addItem("Create Filters", "createHubSpotFilters");
  
  var menu = ui.createMenu("Google Analytics");
  
  menu
  .addItem("Set Spam Referrer Filters", "createSpamReferrerFilters")
  .addItem("Delete Spam Referrer Filters", "deleteSpamReferrerFiltersForSite")
  .addSeparator()
  .addSubMenu(hubSpotMenu)
  .addToUi();
}

function toast(message) {
 SpreadsheetApp.getActive().toast(message); 
}


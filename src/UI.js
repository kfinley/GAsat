
function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  
  var hubSpotMenu = ui.createMenu("HubSpot");
  hubSpotMenu
  .addItem("Create Filters", "createHubSpotFilters");
  
  var spamFiltersMenu = ui.createMenu("Spam Filters");
  spamFiltersMenu
  .addItem("Set Spam Referrer Filters", "createSpamReferrerFilters")
  .addItem("Delete Spam Referrer Filters", "deleteSpamReferrerFiltersForSite")
  
  var menu = ui.createMenu("Google Analytics");
  
  menu
  .addSubMenu(spamFiltersMenu)
  .addSubMenu(hubSpotMenu)
  .addToUi();
}

function toast(message, title) {
  if (title != undefined)
    SpreadsheetApp.getActive().toast(message, title);
  else
    SpreadsheetApp.getActive().toast(message);
}

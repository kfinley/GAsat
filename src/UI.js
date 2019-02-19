
function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  
  var hubSpotFiltersMenu = ui.createMenu("HubSpot");
  hubSpotFiltersMenu
  .addItem("Create Filters", "createHubSpotFilters");
  
  var spamFiltersMenu = ui.createMenu("Spam Referrer Filters");
  spamFiltersMenu
  .addItem("Create Filters", "createSpamReferrerFilters")
  .addItem("Delete Filters", "deleteSpamReferrerFilters")
  
  var internalIpFiltersMenu = ui.createMenu("Internal IP Filters");
  internalIpFiltersMenu
  .addItem("Create Filters", "createInternalIpAddressFilters");

  var menu = ui.createMenu("Google Analytics");
  
  menu
  .addItem("Setup Sheets", "setupSheet")
  .addSeparator()
  .addSubMenu(internalIpFiltersMenu)
  .addSubMenu(spamFiltersMenu)
  .addSubMenu(hubSpotFiltersMenu)
  .addToUi();
}

function toast(message, title) {
  if (title != undefined)
    SpreadsheetApp.getActive().toast(message, title);
  else
    SpreadsheetApp.getActive().toast(message);
}

const Analytics = this.Analytics;

function onOpen() {

  var ui = SpreadsheetApp.getUi();
  var hubSpotFiltersMenu = ui.createMenu("HubSpot");
  hubSpotFiltersMenu
    .addItem("Create Filters", "HubSpotFiltersCreateFilters");

  var spamFiltersMenu = ui.createMenu("Spam Referrer Filters");
  spamFiltersMenu
    .addItem("Create Filters", "SpamReferrerFiltersCreateFilters")
    .addItem("Delete Filters", "SpamReferrerFiltersDeleteFilters")

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

function toast(message: string, title: string) {
  if (title != undefined)
    SpreadsheetApp.getActive().toast(message, title);
  else
    SpreadsheetApp.getActive().toast(message);
}

function getSettings() {
  var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var settings = new Settings();
  settings.Site = settingsSheet.getRange(1, 2).getValue().toString();
  settings.AccountId = settingsSheet.getRange(2, 2).getValue().toString();
  settings.PropertyId = settingsSheet.getRange(3, 2).getValue().toString();
  settings.ViewId = settingsSheet.getRange(4, 2).getValue().toString();
  settings.AdditionalSpammers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Additional Spammers");

  return settings;
}

function SpamReferrerFiltersCreateFilters() {
  new SpamReferrerFilters(getSettings()).CreateFilters();  
}

function SpamReferrerFiltersDeleteFilters() {
  new SpamReferrerFilters(getSettings()).DeleteFilters();
}

function HubSpotFiltersCreateFilters() {
  new HubspotFilters(getSettings()).CreateFilters();
}

function createInternalIpAddressFilters() {
  new IpAddressFilters(getSettings()).CreateFilters();
}
function onOpen() {

  var ui = SpreadsheetApp.getUi();
  var hubSpotFiltersMenu = ui.createMenu("HubSpot");
  hubSpotFiltersMenu
    .addItem("Create Filters", "hubSpotFiltersCreateFilters");

  var spamFiltersMenu = ui.createMenu("Referrer Spam Filters");
  spamFiltersMenu
    .addItem("Create Filters", "referrerSpamFiltersCreateFilters")
    .addItem("Delete Filters", "referrerSpamFiltersDeleteFilters")

  var internalIpFiltersMenu = ui.createMenu("Internal IP Filters");
  internalIpFiltersMenu
    .addItem("Create Filters", "createInternalIpAddressFilters");

  var validHostnameFilterMenu = ui.createMenu("Valid Hostname");
  validHostnameFilterMenu
    .addItem("Create Filter", "createValidHostnameFilter");

  var lowercaseCampaignsMenu = ui.createMenu("Lowercase Campaigns");
  lowercaseCampaignsMenu
    .addItem("Create Filters", "createLowercaseCampaignsFilter");

    var lowercaseUrlsFilterMenu = ui.createMenu("Lowercase URLs");
    lowercaseUrlsFilterMenu
      .addItem("Create Filters", "createLowercaseUrlsFilter");
      
  var menu = ui.createMenu("Google Analytics");

  menu
    .addItem("Setup Sheets", "setupSheet")
    .addSeparator()
    .addSubMenu(validHostnameFilterMenu)
    .addSubMenu(internalIpFiltersMenu)
    .addSubMenu(spamFiltersMenu)
    .addSubMenu(lowercaseCampaignsMenu)
    .addSubMenu(lowercaseUrlsFilterMenu)
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
  settings.InternalIpsAddresses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internal IPs");

  return settings;
}

function referrerSpamFiltersCreateFilters() {

  var spam = new ReferrerSpam();
  spam.filters = new FilterAdmin(getSettings());
  spam.createFilters();
}

function referrerSpamFiltersDeleteFilters() {
  var spam = new ReferrerSpam();
  spam.filters = new FilterAdmin(getSettings());
  spam.deleteFilters();
}

function hubSpotFiltersCreateFilters() {
  var hubSpot = new Hubspot();
  hubSpot.filters = new FilterAdmin(getSettings());
  hubSpot.createFilters();
}

function createInternalIpAddressFilters() {
  var ips = new IpAddress();
  ips.filters = new FilterAdmin(getSettings());
  ips.createFilters();
}

function createValidHostnameFilter() {
  var validHostname = new ValidHostname();
  validHostname.filters = new FilterAdmin(getSettings());
  validHostname.createFilter();
}

function createLowercaseCampaignsFilter() {
  var lowercaseCampaigns = new LowercaseCampaigns();
  lowercaseCampaigns.filters = new FilterAdmin(getSettings());
  lowercaseCampaigns.createFilters();
}

function createLowercaseUrlsFilter() {
  var lowercaseUrls = new LowercaseUrls();
  lowercaseUrls.filters = new FilterAdmin(getSettings());
  lowercaseUrls.createFilter();
}
function onOpen() {

  var ui = SpreadsheetApp.getUi();

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

  var hubSpotMenu = ui.createMenu("HubSpot");
  hubSpotMenu
    .addItem("Create", "hubSpotCreate");

  var facebookMenu = ui.createMenu("Facebook");
  facebookMenu
    .addItem("Create", "facebookCreate");

  var menu = ui.createMenu("Google Analytics");

  menu
    .addItem("Setup Sheets", "setupSheet")
    .addSeparator()
    .addSubMenu(validHostnameFilterMenu)
    .addSubMenu(internalIpFiltersMenu)
    .addSubMenu(spamFiltersMenu)
    .addSubMenu(lowercaseCampaignsMenu)
    .addSubMenu(lowercaseUrlsFilterMenu)
    .addSubMenu(hubSpotMenu)
    .addSubMenu(facebookMenu)
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
  spam.admin = new GoogleAnalyticsAdmin(getSettings());
  spam.createFilters();
}

function referrerSpamFiltersDeleteFilters() {
  var spam = new ReferrerSpam();
  spam.admin = new GoogleAnalyticsAdmin(getSettings());
  spam.deleteFilters();
}

function hubSpotCreate() {
  var hubSpot = new Hubspot();
  hubSpot.admin = new GoogleAnalyticsAdmin(getSettings());
  hubSpot.create();
}

function createInternalIpAddressFilters() {
  var ips = new IpAddress();
  ips.admin = new GoogleAnalyticsAdmin(getSettings());
  ips.createFilters();
}

function createValidHostnameFilter() {
  var validHostname = new ValidHostname();
  validHostname.admin = new GoogleAnalyticsAdmin(getSettings());
  validHostname.createFilter();
}

function createLowercaseCampaignsFilter() {
  var lowercaseCampaigns = new LowercaseCampaigns();
  lowercaseCampaigns.admin = new GoogleAnalyticsAdmin(getSettings());
  lowercaseCampaigns.createFilters();
}

function createLowercaseUrlsFilter() {
  var lowercaseUrls = new LowercaseUrls();
  lowercaseUrls.admin = new GoogleAnalyticsAdmin(getSettings());
  lowercaseUrls.createFilter();
}

function facebookCreate() {
  var facebook = new Facebook();
  facebook.admin = new GoogleAnalyticsAdmin(getSettings());
  facebook.create();
}
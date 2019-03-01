function onOpen() {

  var ui = SpreadsheetApp.getUi();

  var queryParamsMenu = ui.createMenu("Query Params");
  queryParamsMenu
    .addItem("Create", "queryParamsCreate");

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

  var spamFiltersMenu = ui.createMenu("Referrer Spam Filters");
  spamFiltersMenu
    .addItem("Create Filters", "referrerSpamFiltersCreateFilters")
    .addItem("Delete Filters", "referrerSpamFiltersDeleteFilters")

  var hubSpotMenu = ui.createMenu("HubSpot");
  hubSpotMenu
    .addItem("Create", "hubSpotCreate");

  var facebookMenu = ui.createMenu("Facebook");
  facebookMenu
    .addItem("Create", "facebookCreate");

  var amazonAwsMenu = ui.createMenu("Amazon Aws");
  amazonAwsMenu
    .addItem("Create", "amazonAwsCreate");

  var menu = ui.createMenu("Google Analytics");

  menu
    .addItem("Setup Sheets", "setupSheet")
    .addSeparator()
    .addSubMenu(validHostnameFilterMenu)
    .addSubMenu(internalIpFiltersMenu)
    .addSubMenu(queryParamsMenu)
    .addSubMenu(spamFiltersMenu)
    .addSubMenu(lowercaseCampaignsMenu)
    .addSubMenu(lowercaseUrlsFilterMenu)
    .addSubMenu(hubSpotMenu)
    .addSubMenu(facebookMenu)
    .addSubMenu(amazonAwsMenu)
    .addToUi();
}

var isToasting = false;

function toast(message: string, title: string) {

  if (isToasting == true) {
    setTimeout(() => {
      toast(message, title);
    }, (500));
  } else {

    isToasting = true;
    if (title != undefined)
      SpreadsheetApp.getActive().toast(message, title);
    else
      SpreadsheetApp.getActive().toast(message);

    // quick sleep to give time to toast.
    Utilities.sleep(500);
    isToasting = false;

  }
}

function getSettings() {
  var settingsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
  var settings = new Settings();
  settings.site = settingsSheet.getRange(1, 2).getValue().toString();
  settings.accountId = settingsSheet.getRange(2, 2).getValue().toString();
  settings.propertyId = settingsSheet.getRange(3, 2).getValue().toString();
  settings.profileId = settingsSheet.getRange(4, 2).getValue().toString();
  settings.additionalSpammers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Additional Spammers");
  settings.internalIpsAddresses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internal IPs");
  settings.queryParams = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Query Params");

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

function queryParamsCreate() {
  var queryParams = new QueryParams();
  queryParams.admin = new GoogleAnalyticsAdmin(getSettings());
  queryParams.create();
}

function amazonAwsCreate() {
  var amazonAwsCreate = new AmazonAws();
  amazonAwsCreate.admin = new GoogleAnalyticsAdmin(getSettings());
  amazonAwsCreate.create();
}
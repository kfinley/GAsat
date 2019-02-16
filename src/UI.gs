
function onOpen() {
  
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Google Analytics');
  
  menu.addItem("Set Spam Referrer Filters", "createSpamReferrerFilters")
  .addItem("Delete Spam Referrer Filters", "deleteSpamReferrerFiltersForSite")
  .addSeparator()

  .addToUi();
};
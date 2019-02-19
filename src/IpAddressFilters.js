function createInternalIpAddressFilters() {

    try {

        var settings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings");
        var site = settings.getRange(1, 2).getValue();
        var accountId = settings.getRange(2, 2).getValue();
        var propertyId = settings.getRange(3, 2).getValue();
        var viewId = settings.getRange(4, 2).getValue();

        // Delete any old filters
        deleteFilters(accountId, "Internal IP Addresses");

        deleteSpamReferrerFilters(accountId, "Internal IP Addresses");

        var ipList = [];

        var ipAddresses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internal IPs");

        // Get the data from the sheet
        var numRows = ipAddresses.getDataRange().getNumRows();

        // Loop through Sheet
        for (var i = 2; i <= numRows; i++) {
            ipList.push(ipAddresses.getRange(i, 1).getValue());
        }

        createFiltersForList(ipList, "Internal IP Addresses", propertyId, viewId, accountId, createIpAddressExcludeFilter);

        toast("Finished!", "Internal IP Address Filters");
    } catch (ex) {
        Logger.log(ex);
        throw ex;
    }
}
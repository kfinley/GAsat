class IpAddress {

    public filters: FilterAdmin;

    public createFilters() {

        // Delete any old filters
        this.filters.deleteFilters("Internal IP Addresses");

        var ipList = [];

        var ipAddresses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internal IPs");

        // Get the data from the sheet
        var numRows = ipAddresses.getDataRange().getNumRows();

        // Loop through Sheet
        for (var i = 2; i <= numRows; i++) {
            ipList.push(ipAddresses.getRange(i, 1).getValue().toString().replace(".", "\\."));
        }

        this.filters.createFiltersForList(ipList, "Internal IP Addresses", this.filters.createIpAddressExcludeFilter);

        toast("Finished!", "Internal IP Address Filters");
    } catch(ex) {
        Logger.log(ex);
        throw ex;
    }
}
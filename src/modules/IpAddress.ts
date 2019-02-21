class IpAddress {

    public Filters: FilterAdmin;

    public CreateFilters() {

        // Delete any old filters
        this.Filters.deleteFilters("Internal IP Addresses");

        var ipList = [];

        var ipAddresses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internal IPs");

        // Get the data from the sheet
        var numRows = ipAddresses.getDataRange().getNumRows();

        // Loop through Sheet
        for (var i = 2; i <= numRows; i++) {
            ipList.push(ipAddresses.getRange(i, 1).getValue());
        }

        this.Filters.createFiltersForList(ipList, "Internal IP Addresses", this.Filters.createIpAddressExcludeFilter);

        toast("Finished!", "Internal IP Address Filters");
    } catch(ex) {
        Logger.log(ex);
        throw ex;
    }
}
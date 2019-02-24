class IpAddress {

    public admin: GoogleAnalyticsAdmin;

    public createFilters() {

        // Delete any old filters
        this.admin.deleteFilters("Internal IP Addresses");

        var ipList = [];

        var ipAddresses = this.admin.settings.internalIpsAddresses;
        // Get the data from the sheet
        var numRows = ipAddresses.getDataRange().getNumRows();

        // Loop through Sheet
        for (var i = 2; i <= numRows; i++) {
            ipList.push(ipAddresses.getRange(i, 1).getValue().toString().split(".").join("\\."));
        }

        this.admin.createFiltersForList(ipList, "Internal IP Addresses", this.admin.createIpAddressExcludeFilter);

        toast("Finished!", "Internal IP Address Filters");
    } catch(ex) {
        Logger.log(ex);
        throw ex;
    }
}
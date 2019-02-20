class IpAddressFilters {
    private settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }

    public CreateFilters() {

        // Delete any old filters
        deleteFilters(this.settings.AccountId, "Internal IP Addresses");

        var ipList = [];

        var ipAddresses = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Internal IPs");

        // Get the data from the sheet
        var numRows = ipAddresses.getDataRange().getNumRows();

        // Loop through Sheet
        for (var i = 2; i <= numRows; i++) {
            ipList.push(ipAddresses.getRange(i, 1).getValue());
        }

        createFiltersForList(ipList, "Internal IP Addresses", this.settings.PropertyId, this.settings.ViewId, this.settings.AccountId, createIpAddressExcludeFilter);

        toast("Finished!", "Internal IP Address Filters");
    } catch(ex) {
        Logger.log(ex);
        throw ex;
    }
}
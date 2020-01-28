class QueryParams {

    public admin: GoogleAnalyticsAdmin;

    public create() {
        toast("site: " + this.admin.settings.site, "Adding Exclude Query Parameters");

        var paramsList = [];
        var queryParams = this.admin.settings.queryParams;
        
        // Get the data from the sheet
        var numRows = queryParams.getDataRange().getNumRows();

        // Loop through Sheet
        for (var i = 2; i <= numRows; i++) {
            paramsList.push(queryParams.getRange(i, 1).getValue().toString());
        }

        var params = paramsList.join(",");
        this.admin.addExcludeURLQueryParameters(params);

        toast("", "Finished!");
    }
}
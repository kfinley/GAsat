class Facebook {

    public admin: GoogleAnalyticsAdmin;

    public create() {
        toast("site: " + this.admin.settings.site, "Creating Facebook Settings");

        var params = "fbclid";

        this.admin.addExcludeURLQueryParameters(params);

        toast("", "Finished!");
    }
}
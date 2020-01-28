class Facebook {

    public admin: GoogleAnalyticsAdmin;

    public create() {
        toast("site: " + this.admin.settings.site, "Adding Exclude Facebook URL Query Parameters");

        var params = "fbclid";

        this.admin.addExcludeURLQueryParameters(params);

        toast("", "Finished!");
    }
}
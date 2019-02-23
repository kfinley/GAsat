class Facebook {

    public admin: GoogleAnalyticsAdmin;

    public create() {
        toast("site: " + this.admin.settings.Site, "Creating Facebook Settings");

        var params = "fbclid";

        this.admin.addExcludeURLQueryParameters(params);

        // quick sleep toasts don't overlap
        Utilities.sleep(1000);

        toast("", "Finished!");
    }
}
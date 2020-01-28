class ValidHostname {

    public admin: GoogleAnalyticsAdmin;

    public createFilter() {
        toast("site: " + this.admin.settings.site, "Valid Hostname Filters");

        this.admin.deleteFilters("Valid Hostname");

        var filter = this.admin.getFilter("Valid Hostname");

        if (filter == null) {
            filter = this.admin.createValidHostnameFilter("Valid Hostname");
        }

        toast("", "Finished!");
    }
}  
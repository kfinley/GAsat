class LowercaseUrls {

    public admin: GoogleAnalyticsAdmin;

    public createFilter() {
        toast("site: " + this.admin.settings.site, "Creating Lowercase URLs Filters");

        var filter = this.admin.getFilter("Lowercase URLs");

        if (filter == null) {
            filter = this.admin.createLowercaseFilter("Lowercase URLs", "PAGE_REQUEST_URI");
        }

        toast("", "Finished!");
    }
}

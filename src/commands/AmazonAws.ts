class AmazonAws {

    public admin: GoogleAnalyticsAdmin;

    public create() {
        toast("site: " + this.admin.settings.site, "Creating AmazonAws ISP filter");

        var filter = this.admin.getFilter("Exclude Custom Field - excluded");

        if (filter == null) {
            filter = this.admin.createCustomExcludeFilter("Exclude Custom Field - excluded", "CUSTOM_FIELD_1", "excluded");
        }

        filter = this.admin.getFilter("amazonaws.com ISP Domain Filter");

        if (filter == null) {
            filter = this.admin.createAdvancedFilter("amazonaws.com ISP Domain Filter", "GEO_ORGANIZATION", true, "", false, "CUSTOM_FIELD_1", false);
        }

        toast("", "Finished!");
    }
}
class LowercaseCampaigns {

    public admin: GoogleAnalyticsAdmin;

    public createFilters() {
        toast("site: " + this.admin.settings.Site, "Creating Lowercase Campaigns Filters");

        var filter = this.admin.getFilter("Lowercase Campaign Name");

        if (filter == null) {
            filter = this.admin.createLowercaseFilter("Lowercase Campaign Name", "CAMPAIGN_NAME");
        }

        filter = this.admin.getFilter("Lowercase Campaign Source");

        if (filter == null) {
            filter = this.admin.createLowercaseFilter("Lowercase Campaign Source", "CAMPAIGN_SOURCE");
        }

        filter = this.admin.getFilter("Lowercase Campaign Medium");

        if (filter == null) {
            filter = this.admin.createLowercaseFilter("Lowercase Campaign Medium", "CAMPAIGN_MEDIUM");
        }

        filter = this.admin.getFilter("Lowercase Campaign Term");

        if (filter == null) {
            filter = this.admin.createLowercaseFilter("Lowercase Campaign Term", "CAMPAIGN_TERM");
        }

        filter = this.admin.getFilter("Lowercase Campaign Content");

        if (filter == null) {
            filter = this.admin.createLowercaseFilter("Lowercase Campaign Content", "CAMPAIGN_CONTENT");
        }

        toast("", "Finished!");
    }
}
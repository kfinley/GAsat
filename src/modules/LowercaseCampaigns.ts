class LowercaseCampaigns {

    public filters: FilterAdmin;

    public createFilters() {
        toast("site: " + this.filters.settings.Site, "Creating Lowercase Campaigns Filters");

        var filter = this.filters.getFilter("Lowercase Campaign Name");

        if (filter == null) {
            filter = this.filters.createLowercaseFilter("Lowercase Campaign Name", "CAMPAIGN_NAME");
        }

        filter = this.filters.getFilter("Lowercase Campaign Source");

        if (filter == null) {
            filter = this.filters.createLowercaseFilter("Lowercase Campaign Source", "CAMPAIGN_SOURCE");
        }

        filter = this.filters.getFilter("Lowercase Campaign Medium");

        if (filter == null) {
            filter = this.filters.createLowercaseFilter("Lowercase Campaign Medium", "CAMPAIGN_MEDIUM");
        }

        filter = this.filters.getFilter("Lowercase Campaign Term");

        if (filter == null) {
            filter = this.filters.createLowercaseFilter("Lowercase Campaign Term", "CAMPAIGN_TERM");
        }

        filter = this.filters.getFilter("Lowercase Campaign Content");

        if (filter == null) {
            filter = this.filters.createLowercaseFilter("Lowercase Campaign Content", "CAMPAIGN_CONTENT");
        }

        toast("", "Finished!");
    }
}
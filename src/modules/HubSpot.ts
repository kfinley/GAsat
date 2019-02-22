class Hubspot {

  public filters: FilterAdmin;

  public createFilters() {
    toast("site: " + this.filters.settings.Site, "Creating HubSpot Filters");

    var filter = this.filters.getFilter("HubSpot ISP Filter");

    if (filter == null) {
      filter = this.filters.createIspOrganizationExcludeFilter("HubSpot ISP Filter", "HubSpot");
    } 

    filter = this.filters.getFilter("HubSpot Sources Filter");

    if (filter == null) {
      var sources = [];
      sources.push("app\\.hubspot\\.com");
      sources.push("\\.sandbox\\.hs-sites\\.com");

      this.filters.createFiltersForList(sources, "Hubspot Sources Filter", this.filters.createCampaignSourceExcludeFilter);
    }

    toast("", "Finished!");
  }
}
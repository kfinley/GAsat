class Hubspot {

  public Filters: FilterAdmin;

  public CreateFilters() {
    toast("site: " + this.Filters.Settings.Site, "Creating HubSpot Filters");

    var filter = this.Filters.getFilter("HubSpot ISP Filter");

    if (filter == null) {
      filter = this.Filters.createIspOrganizationExcludeFilter("HubSpot ISP Filter", "HubSpot");
    } 

    filter = this.Filters.getFilter("HubSpot Sources Filter");

    if (filter == null) {
      var sources = [];
      sources.push("app.hubspot.com");
      sources.push("www-bendhsa-com.sandbox.hs-sites.com");

      this.Filters.createFiltersForList(sources, "Hubspot Sources Filter", this.Filters.createCampaignSourceExcludeFilter);
    }

    toast("", "Finished!");
  }
}
class Hubspot {

  public Filters: FilterAdmin;

  public CreateFilters() {
    toast("site: " + this.Filters.Settings.Site, "Creating HubSpot Filters");

    var filter = this.Filters.getFilter("HubSpot ISP Filter");

    if (filter == null) {
      filter = this.Filters.createIspOrganizationExcludeFilter("HubSpot ISP Filter", "HubSpot");
    } 

    toast("", "Finished!");
  }
}
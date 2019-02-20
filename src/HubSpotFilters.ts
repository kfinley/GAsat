class HubspotFilters {

  private settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  public CreateFilters() {
    toast("site: " + this.settings.Site, "Creating HubSpot Filters");

    var filter = getFilter(this.settings.AccountId, "HubSpot ISP Filter");

    if (filter == null) {
      filter = createIspOrganizationExcludeFilter(this.settings.PropertyId, this.settings.ViewId, "HubSpot ISP Filter", this.settings.AccountId, "HubSpot");
    } 

    toast("", "Finished!");
  }
}
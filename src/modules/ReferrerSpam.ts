class ReferrerSpam {

  public filters: FilterAdmin;

  public deleteFilters() {
    // Delete any old filters
    toast("Site: " + this.filters.settings.Site, "Deleting Existing Filters");
    this.filters.deleteFilters("Referrer Spam");
    toast("Site: " + this.filters.settings.Site, "Finished Deleting Existing Filters");
  }

  public createFilters() {
    try {

      // Delete any old filters
      toast("Site: " + this.filters.settings.Site, "Deleting Existing Spam Filters");
      this.filters.deleteFilters("Referrer Spam");

      toast("Site: " + this.filters.settings.Site, "Creating Spam Filters");

      // Open the Referrer Spam List from github
      var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt");
      var referrers = response.getContentText().split("\n");

      // Get the data from the sheet
      var numRows = this.filters.settings.AdditionalSpammers.getDataRange().getNumRows();

      // Loop through Sheet
      for (var i = 2; i <= numRows; i++) {
        referrers.push(this.filters.settings.AdditionalSpammers.getRange(i, 1).getValue().toString());
      }

      this.filters.createFiltersForList(referrers, "Referrer Spam", this.filters.createCampaignSourceExcludeFilter);

      toast("Finished!", "Spam Referrer Filters");
    } catch (ex) {
      Logger.log(ex);
      throw ex;
    }
  }
}

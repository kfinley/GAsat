class ReferrerSpam {

  public Filters: FilterAdmin;

  public DeleteFilters() {
    // Delete any old filters
    toast("Site: " + this.Filters.Settings.Site, "Deleting Existing Filters");
    this.Filters.deleteFilters("Referrer Spam");
    toast("Site: " + this.Filters.Settings.Site, "Finished Deleting Existing Filters");
  }

  public CreateFilters() {
    try {

      // Delete any old filters
      toast("Site: " + this.Filters.Settings.Site, "Deleting Existing Spam Filters");
      this.Filters.deleteFilters("Referrer Spam");

      toast("Site: " + this.Filters.Settings.Site, "Creating Spam Filters");

      // Open the Referrer Spam List from github
      var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt");
      var referrers = response.getContentText().split("\n");

      // Get the data from the sheet
      var numRows = this.Filters.Settings.AdditionalSpammers.getDataRange().getNumRows();

      // Loop through Sheet
      for (var i = 2; i <= numRows; i++) {
        referrers.push(this.Filters.Settings.AdditionalSpammers.getRange(i, 1).getValue().toString());
      }

      this.Filters.createFiltersForList(referrers, "Referrer Spam", this.Filters.createCampaignSourceExcludeFilter);

      toast("Finished!", "Spam Referrer Filters");
    } catch (ex) {
      Logger.log(ex);
      throw ex;
    }
  }
}

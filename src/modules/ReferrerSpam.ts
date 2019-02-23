class ReferrerSpam {

  public admin: GoogleAnalyticsAdmin;

  public deleteFilters() {
    // Delete any old filters
    toast("Site: " + this.admin.settings.Site, "Deleting Existing Filters");
    this.admin.deleteFilters("Referrer Spam");
    toast("Site: " + this.admin.settings.Site, "Finished Deleting Existing Filters");
  }

  public createFilters() {
    try {

      // Delete any old filters
      toast("Site: " + this.admin.settings.Site, "Deleting Existing Spam Filters");
      this.admin.deleteFilters("Referrer Spam");

      toast("Site: " + this.admin.settings.Site, "Creating Spam Filters");

      // Open the Referrer Spam List from github
      var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt");
      var referrers = response.getContentText().split("\n");

      // Get the data from the sheet
      var numRows = this.admin.settings.AdditionalSpammers.getDataRange().getNumRows();

      // Loop through Sheet
      for (var i = 2; i <= numRows; i++) {
        referrers.push(this.admin.settings.AdditionalSpammers.getRange(i, 1).getValue().toString());
      }

      this.admin.createFiltersForList(referrers, "Referrer Spam", this.admin.createCampaignSourceExcludeFilter);

      toast("Finished!", "Spam Referrer Filters");
    } catch (ex) {
      Logger.log(ex);
      throw ex;
    }
  }
}

class SpamReferrerFilters {

  private settings: Settings;

  constructor(settings: Settings) {
    this.settings = settings;
  }

  public DeleteFilters() {
    // Delete any old filters
    toast("Site: " + this.settings.Site, "Deleting Existing Filters");
    deleteFilters(this.settings.AccountId, "Referrer Spam");
    toast("Site: " + this.settings.Site, "Finished Deleting Existing Filters");
  }

  public CreateFilters() {
    try {

      // Delete any old filters
      toast("Site: " + this.settings.Site, "Deleting Existing Spam Filters");
      deleteFilters(this.settings.AccountId, "Referrer Spam");

      toast("Site: " + this.settings.Site, "Creating Spam Filters");

      // Open the Referrer Spam List from github
      var response = UrlFetchApp.fetch("https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt");
      var referrers = response.getContentText().split("\n");

      // Get the data from the sheet
      var numRows = this.settings.AdditionalSpammers.getDataRange().getNumRows();

      // Loop through Sheet
      for (var i = 2; i <= numRows; i++) {
        referrers.push(this.settings.AdditionalSpammers.getRange(i, 1).getValue().toString());
      }

      createFiltersForList(referrers, "Referrer Spam", this.settings.PropertyId, this.settings.ViewId, this.settings.AccountId, createCampaignSourceExcludeFilter);

      toast("Finished!", "Spam Referrer Filters");
    } catch (ex) {
      Logger.log(ex);
      throw ex;
    }
  }
}

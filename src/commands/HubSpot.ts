class Hubspot {

  public admin: GoogleAnalyticsAdmin;

  public create() {
    toast("site: " + this.admin.settings.site, "Creating HubSpot Filters & Settings");

    var filter = this.admin.getFilter("HubSpot ISP Filter");

    if (filter == null) {
      filter = this.admin.createIspOrganizationExcludeFilter("HubSpot ISP Filter", "HubSpot");
    } 

    filter = this.admin.getFilter("HubSpot Sources Filter");

    if (filter == null) {
      var sources = [];
      sources.push("app\\.hubspot\\.com");
      sources.push("\\.sandbox\\.hs-sites\\.com");

      this.admin.createFiltersForList(sources, "Hubspot Sources Filter", this.admin.createCampaignSourceExcludeFilter);
    }

          /*
      TODO: Add these
      ??: "page,submissionGuid"
      */

    var hubSpotParams = "_hsenc,_hsmi,hss_channel,hsa_acc,hs_preview,hsDebug,hsCtaTracking,__hstc,hsa_kw,__hssc,hsa_ver,__hsfp,hsa_ad,hsa_net,hsa_mt,hsa_cam,hsa_src,hsa_tgt,hsa_grp";

    this.admin.addExcludeURLQueryParameters(hubSpotParams);

    toast("", "Finished!");
  }
}
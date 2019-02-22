class LowercaseUrls {

    public filters: FilterAdmin;

    public createFilter() {
        toast("site: " + this.filters.settings.Site, "Creating Lowercase URLs Filters");

        var filter = this.filters.getFilter("Lowercase URLs");

        if (filter == null) {
            filter = this.filters.createLowercaseFilter("Lowercase URLs", "PAGE_REQUEST_URI");
        }
    }
}

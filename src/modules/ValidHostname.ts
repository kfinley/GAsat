class ValidHostname {

    public filters: FilterAdmin;

    public createFilter() {
        toast("site: " + this.filters.settings.Site, "Valid Hostname Filters");

        this.filters.deleteFilters("Valid Hostname");

        var filter = this.filters.getFilter("Valid Hostname");

        if (filter == null) {
            filter = this.filters.createValidHostnameFilter("Valid Hostname");
        }

        toast("", "Finished!");
    }
}  
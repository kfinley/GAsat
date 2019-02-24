function setupSheet() {

    var settings = createSheet("Settings");
    if (settings != null) {
        settings.getRange(1, 1).setValue("Site").setFontWeight("bold");
        settings.getRange(2, 1).setValue("Google Account ID").setFontWeight("bold");
        settings.getRange(3, 1).setValue("Google Property ID").setFontWeight("bold");
        settings.getRange(4, 1).setValue("Google View ID").setFontWeight("bold");
        settings.autoResizeColumn(1);
    }

    var additionalSpammers = createSheet("Additional Spammers");
    if (additionalSpammers != null)
        additionalSpammers.getRange(1, 1).setValue("Add Additional Spammers here (one per row in column A)").setFontWeight("bold");

    var internalIpAddresses = createSheet("Internal IPs");
    if (internalIpAddresses != null)
        internalIpAddresses.getRange(1, 1).setValue("Add IP addresses to be filtered here (one per row in column A)").setFontWeight("bold");

    var queryParams = createSheet("Query Params");
    if (queryParams != null)
        queryParams.getRange(1, 1).setValue("Add Exclude URL Query Params here(one per row in column A)").setFontWeight("bold");

    toast("Sheets created", "Setup Complete");

}

function createSheet(sheetName) {

    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var sheet = ss.getSheetByName(sheetName);

    if (sheet == null) {
        return ss.insertSheet(sheetName);
    }

}
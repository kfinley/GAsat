# Google Analytics Admin Tool

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg)](https://github.com/ellerbrock/typescript-badges/)
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)


Manage Google Analytics from Google Sheets using App Scripts. This is a work in progress. The current focus is on adding standard Best Practices filters.

## How to use
1. Install [Clasp](https://github.com/google/clasp)

2. Create a Google Sheet to deploy script to

3. [Enable](https://script.google.com/home/usersettings) Apps Script API 

4. Add `.clasp.json` file to the `src` folder

    File format:
    ```
    {"scriptId":"xxxxxx"}
    ```
    Locate the Script ID in Sheets Script Editor (`Tools -> Script etitor`) under the File menu (`File -> Project properties`)

5. Run `clasp login` from the `src` folder

6. Run `clasp push` from the `src` folder to deploy code to Sheets

7. Refresh (or open) the Sheet created in step 2

8. Run `Setup Sheets` from new Google Analytics menu that appears after Sheets loads

9. Add target Google Analytics settings to the Settings sheet

10. Run commands from `Google Analytics` menu

## Curent Features
- Valid hostname Filter
- Lowercase URI Filter
- Lowercase Filter for ‘Campaign Name’, ‘Campaign Source’, ‘Campaign Medium’, ‘Campaign Term’ and ‘Campaign Content’
- Internal IP Addresses Filter
- Referral Spam Filter - (Using the [Matomo blacklist](https://github.com/matomo-org/referrer-spam-blacklist) and an additional custom list)
- HubSpot by ISP Organization Filter 
- HubSpot app and sandbox domains Filter
- Add HubSpot tracking params to Exclude URL Query Parameters View Settings
- Add Facebook fbclid param to Exclude URL Query Parameters View Settings
- Add additional Exclude URL Query Parameters from sheet
- Added amazonaws.com ISP Domain filter


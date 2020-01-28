# GAsat: Google Analytics Sheets Admin Tool

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg)](https://github.com/ellerbrock/typescript-badges/)
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)


Manage Google Analytics from Google Sheets using App Scripts written in [TypeScript](https://github.com/Microsoft/TypeScript) and deployed with [Clasp](https://github.com/google/clasp). 

GAsat is a collection of scripts built over the years for managing Google Analytics. It is built as a stand alone Google Sheets plugin that can be deployed as needed.

The current focus of the project is to add common filters and configurations that follow latest best practices. Pull requests are welcome just be nice and add an issue for any new work.

## Project Setup
1. Clone repo

2. Install [Clasp](https://github.com/google/clasp)

3. Create a Google Sheet for the project. Name it anything you'd like.

4. [Enable](https://script.google.com/home/usersettings) Apps Script API 

5. Add a `.clasp.json` file to the `src` folder

    File format:
    ```
    {"scriptId":"xxxxxx"}
    ```
    Locate the Script ID in Sheets script editor (`Tools -> Script editor`) under the File menu (`File -> Project properties`)

6. Run `clasp login` from the `src` folder

7. Run `clasp push` from the `src` folder to deploy code to Sheets

8. Refresh (or open) the Sheet created in step 2

9.  Run `Setup Sheets` from new Google Analytics menu that appears after Sheets loads

10. Add target Google Analytics settings to the Settings sheet

11. Run commands from `Google Analytics` menu

12. Confirm settings in Google Analytics

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


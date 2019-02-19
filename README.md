# Google Analytics Admin Tool
[![clasp](https://img.shields.io/badge/built%20with-clasp-4285f4.svg)](https://github.com/google/clasp)

Manage Google Analytics from Google Sheets using App Scripts. 

## How to use
1. Install Clasp (https://github.com/google/clasp)

2. Create a Google Sheet to deploy script to

3. Enable Apps Script API: https://script.google.com/home/usersettings

4. Add .clasp.json file to the src folder

    File format:
    ```
    {"scriptId":"xxxxxx"}
    ```
    Locate the Script ID in Sheets Script Editor `File -> Project properties`

5. Run `clasp login` from the src folder

6. Run `clasp push` from the src folder to deploy code to Sheets.

7. Refresh (or open) the Sheet created in step 2.

8. Run `Setup Sheets` from new Google Analytics menu that appears after Sheets loads.

9. Add settings to the new Settings sheet that is added.

10. Run commands from Google Analytics menu.

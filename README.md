# Google Analytics Admin Tool

Here you will find an App Scripts project for managing Google Analytics from Google Sheets.

## How does it work?
1. Create a Google Sheet

2. Add tabs
    - Settings
    - Addtional Spammers

    Add the follwing to the Settings sheet. 
    Label in Column A with the associated values in Column B

    Google Account ID

    Google Property ID

    Google View ID

    Last Ran

3. Install Clasp (https://github.com/google/clasp)
4. Add .clasp.json file to src folder

    File format:
    ```
    {"scriptId":"xxxxxx"}
    ```
    Locate the Script ID in Sheets Script Editor File -> Project properties

5. Deploy using clasp push
6. Refresh Google Sheet and issue commands using the Google Analytics menu.

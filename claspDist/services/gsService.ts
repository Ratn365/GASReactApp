export default class GSService {
    private ss: GoogleAppsScript.Spreadsheet.Spreadsheet | null = null;
    private sheet: GoogleAppsScript.Spreadsheet.Sheet | null = null;

    /**
     * Open a spreadsheet by its ID
     * @param {string} ssID - The spreadsheet file to open
     * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} The opened spreadsheet
     */
    openSpreadsheet(ssID: string): GoogleAppsScript.Spreadsheet.Spreadsheet {
        this.ss = SpreadsheetApp.openById(ssID);
        return this.ss;
    }

    /**
     * Create a new spreadsheet with the given name
     * @param {string} spreadsheetName - The name for the new spreadsheet
     * @return {GoogleAppsScript.Spreadsheet.Spreadsheet} The created spreadsheet
     */
    createSpreadsheet(spreadsheetName: string): GoogleAppsScript.Spreadsheet.Spreadsheet {
        this.ss = SpreadsheetApp.create(spreadsheetName);
        return this.ss;
    }

    /**
     * Create a new sheet with the given name
     * @param {string} sheetName - The name for the new sheet
     * @return {GoogleAppsScript.Spreadsheet.Sheet} The created sheet
     */
    createSheet(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
        if (!this.ss) {
            throw new Error('Spreadsheet is not initialized');
        }
        this.sheet = this.ss.getSheetByName(sheetName);
        if (!this.sheet) {
            this.sheet = this.ss.insertSheet(sheetName);
            Logger.log('Sheet created: ' + sheetName);
        } else {
            Logger.log('Sheet already exists: ' + sheetName);
        }
        return this.sheet;
    }

    /**
     * Gets a sheet by its name.
     * @param {string} sheetName - The name of the sheet.
     * @returns {GoogleAppsScript.Spreadsheet.Sheet} The sheet object.
     */
    getSheetByName(sheetName: string): GoogleAppsScript.Spreadsheet.Sheet {
        if (!this.ss) {
            throw new Error('Spreadsheet is not initialized');
        }
        this.sheet = this.ss.getSheetByName(sheetName);
        if (!this.sheet) {
            throw new Error(`Sheet '${sheetName}' not found`);
        }
        return this.sheet;
    }

    /**
     * Delete an existing sheet by its name.
     * @param {string} sheetName - The name of the sheet.
     */
    deleteSheet(sheetName: string): void {
        if (!this.ss) {
            throw new Error('Spreadsheet is not initialized');
        }
        const sheet = this.ss.getSheetByName(sheetName);
        if (sheet) {
            this.ss.deleteSheet(sheet);
            Logger.log(`Sheet '${sheetName}' deleted`);
        } else {
            Logger.log(`Sheet '${sheetName}' not found`);
        }
    }
}

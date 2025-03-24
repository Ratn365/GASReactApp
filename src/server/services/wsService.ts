import utility from "../lib/utility";

/**
 * WSService class provides various methods to interact with a Google Sheets spreadsheet. 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The name of the sheet to interact with.
 * @constructor
 */
export default class WSService {
  private _sheet: GoogleAppsScript.Spreadsheet.Sheet;
  private headArr: string[];

  constructor(sheet: string) {
    this._sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet)!;
    this.headArr = [];
  }

  private set _setheaderRow(rowNumber: number) {
    this.headArr = this._getRow(rowNumber);
  }

  private _getRowIndexes(criteria: { [key: string]: any }): number {
    const criteriaKey = Object.keys(criteria)[0];
    const criteriaValue = criteria[criteriaKey];
    const colIndex = this.headArr.indexOf(criteriaKey) + 1; // Adjust for 1-based index
    const colData = this._getCol(colIndex); // Get the column data
    const rowIndex = colData.indexOf(criteriaValue);
    return rowIndex;
  }

  

  /**
   * Retrieves the row from the specified rowNumber of the sheet.
   * To get the headers, pass the rowNumber of header or leave it empty.
   * @param {number} [rowNumber=1] - The row number from which to get the headers. Defaults to 1.
   * @returns {Array} An array containing the headers from the specified row.
   * @private
   */
  private _getRow(rowNumber: number = 1): string[] {
    return this._sheet.getRange(rowNumber, 1, 1, this._sheet.getLastColumn()).getValues()[0];
  }

  /**
   * Retrieves the values from a specified column in the sheet.
   *
   * @param {number} [colNumber=1] - The column number to retrieve values from (1-based index).
   * @returns {Array} An array of values from the specified column.
   */
  private _getCol(colNumber: number = 1): any[] {
    return this._sheet.getRange(1, colNumber, this._sheet.getLastRow(), 1).getValues().flat();
  }

  //Public methods
  /**
   * Retrieves all values from the sheet, either from the entire sheet or a specified range.
   *
   * @param {string} [a1Range=""] - The A1 notation of the range to retrieve. If empty, retrieves the entire sheet.
   * @returns {Object} An object with two methods:
   *   - `asArray`{Function}: Returns the values as a 2D array, including the header row.
   *   - `asObjs`{Function}: Returns the values as an array of objects, using the first row as headers.
   */
  getAll(a1Range: string = "") {
    let values: string[][] = [];
    if (!a1Range) {
      values = this._sheet.getDataRange().getDisplayValues();
    } else {
      values = this._sheet.getRange(a1Range).getDisplayValues();
    }
    return {
      asArray: () => values,
      asObjs: (headerRowNumber?: number) => {
        if (headerRowNumber) {
          this._setheaderRow = headerRowNumber;
        } else {
          this._setheaderRow = 1;
          values.shift();
        }
        return utility.objectify(values, this.headArr);
      }
    };
  }

  /**
   * Retrieves a row from the data based on the given criteria.
   *
   * @param {Object} criteria - The criteria to find the row index, here it takes only one property and it should be unique value.
   * @returns {Object} An object with methods to get the row as an array or as an object.
   * - `asArray`{Function}:  - A function that returns the row as an array.
   * - `asObj`{Function}:  - A function that returns the row as an object, with an optional header row number.
   */
  getRow(criteria: { [key: string]: any }) {
    const rowIndex = this._getRowIndexes(criteria);
    const rowNumber = rowIndex + 1; // Adjusting for 1-based index in Sheets

    return {
      asArray: () => this._getRow(rowNumber),
      asObj: (headerRowNumber: number = 1) => {
        this._setheaderRow = headerRowNumber;
        const arrData = [this._getRow(rowNumber)];
        return utility.objectify(arrData, this.headArr);
      }
    };
  }

  //Post requests
  /**
   * Adds data to the sheet after processing it.
   *
   * @param {Array|Object[]]} data - The data to be added. It can be an array of objects or Array of array types.
   * If it is an array of objects, it will be converted to an array of arrays.
   */
  add(data: any[] | { [key: string]: any }[]) {
    let arrayfy_data: any[] = [];
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
      arrayfy_data = utility.arrayfy(data);
    } else {
      arrayfy_data = data;
    }
    arrayfy_data.shift();
    this._sheet.insertRowsBefore(2, arrayfy_data.length);
    this._sheet.getRange(2, 1, arrayfy_data.length, arrayfy_data[0].length).setValues(arrayfy_data);
    SpreadsheetApp.flush();
  }

  /**
   * Updates a row in the sheet based on the given criteria and data object.
   *
   * @param {Object} criteria - The criteria object to find the row to update. 
   *                            Each key-value pair represents a column and its expected value.
   * @param {Object} rowObj - The row object containing the new values to update the row with.
   *                           The keys should match the column headers in the sheet.
   * @throws {Error} If no row is found matching the criteria.
   */
  updateRow(criteria: { [key: string]: any }, rowObj: { [key: string]: any }) {
    const rowIndex = this._getRowIndexes(criteria);
    const rowNumber = rowIndex + 1; // Adjusting for 1-based index in Sheets

    const arrayfy_data = utility.arrayfy([rowObj]);
    this._sheet.getRange(rowNumber, 1, 1, this.headArr.length).setValues([arrayfy_data[1]]);
    SpreadsheetApp.flush();
  }

  /**
   * Updates specific cells in a Google Sheets document based on the provided criteria and data object.
   *
   * @param {Object} criteria - The criteria object used to find the row number to update.
   * @param {Object} dataObj -  The data object containing the new values to update the cells with.
   *                            The keys should match the column headers in the sheet.
   */
  updateCells(criteria: { [key: string]: any }, dataObj: { [key: string]: any }) {
    const rowIndex = this._getRowIndexes(criteria);
    const rowNumber = rowIndex + 1; // Adjusting for 1-based index in Sheets

    Object.keys(dataObj).forEach((key) => {
      const colIndex = this.headArr.indexOf(key) + 1; // Adjust for 1-based index
      if (colIndex > 0) {
        this._sheet.getRange(rowNumber, colIndex).setValue(dataObj[key]);
      }
    });

    SpreadsheetApp.flush();
  }

  //#Region extra functions

  /**
    * Creates a dropdown list in the specified cell with the provided data.
    *
    * @param {string} [cellAddress="A1"] - The address of the cell where the dropdown will be created.
    * @param {Array} [data=[]] - The list of values to be included in the dropdown.
    */
  createDropDown(cellAddress: string = "A1", data: string[] = []) {
    const range = this._sheet.getRange(cellAddress);
    range.clearContent();
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(data)
      .setAllowInvalid(false)
      .build();
    range.setDataValidation(rule);
  }

  /**
  * Filters an array of data based on multiple criteria.
  *
  * @param {Array<Object>} data - The array of data objects to be filtered.
  * @param {Array<Object>} criteriaArray - An array of criteria objects. Each criteria object can contain key-value pairs where the key is the field name and the value is the condition to match.
  * 
  * Each criteria object can have the following conditions:
  * - `$lt`: Less than (for date comparisons)
  * - `$gte`: Greater than or equal to (for date comparisons)
  * - `$ltn`: Less than (for numeric comparisons)
  * - `$gten`: Greater than or equal to (for numeric comparisons)
  * 
  * If the value is a string, it performs a case-insensitive substring match.
  * If the value is a number, it performs an exact match.
  *
  * @returns {Array<Object>} The filtered array of data objects that match any of the criteria.
  */
  find(data: { [key: string]: any }[], criteriaArray: { [key: string]: any }[]): { [key: string]: any }[] {
    const filterFn = (row: { [key: string]: any }) => {
      return criteriaArray.some(criteria => {
        return Object.keys(criteria).every(key => {
          if (typeof criteria[key] === "object") {
            const condition = criteria[key];
            const value = row[key];
            if ("$lt" in condition && !(new Date(value) < new Date(condition.$lt))) return false;
            if ("$gte" in condition && !(new Date(value) >= new Date(condition.$gte))) return false;
            if ("$ltn" in condition && !(value < condition.$ltn)) return false;
            if ("$gten" in condition && !(value >= condition.$gten)) return false;
          } else if (typeof criteria[key] === "number") {
            return row[key] === criteria[key];
          } else {
            return row[key] && row[key].toLowerCase().includes(criteria[key].toLowerCase());
          }
          return true;
        });
      });
    };

    return data.filter(filterFn);
  }
  //#endRegion
}

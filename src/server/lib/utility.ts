/**
 * Utility functions for the Apps Script application.
 */
class Utility {

	/**
	 * Convert range values to an array of objects.
	 * @param {Array[]} valuesArr - The range values to convert.
	 * @param {Array<String>} [keysArr] - The headers to use. If empty, the first row of rangeValues is used.
	 * @return {Object[]} An array of objects representing the rows.
	 */
	objectify(valuesArr: any[][], keysArr: string[]): Record<string, any>[] {
		return valuesArr.map((row) => {
			let obj: Record<string, any> = {};
			row.forEach((rowVal, index) => {
				obj[keysArr[index]] = rowVal;
			});
			return obj;
		});
	}

	/**
	 * Converts an array of objects into a 2D array with headers.
	 *
	 * @param {Object[]} data - The array of objects to be converted.
	 * @returns {Array[]} A 2D array where the first row contains the headers and the subsequent rows contain the object values.
	 */
	arrayfy(data: Record<string, any>[]): any[][] {
		const headers = Object.keys(data[0]);
		const rows = data.map((obj) => {
			return headers.map((header) => obj[header] || "");
		});
		return [headers].concat(rows);
	}

	/**
	 * Format a date into a readable string.
	 *
	 * @param {Date} date - The date to format
	 * @return {string} The formatted date string
	 */
	formatDate(date: Date): string {
		if (!date) return "";

		return Utilities.formatDate(
			date,
			Session.getScriptTimeZone(),
			"yyyy-MM-dd HH:mm:ss",
		);
	}

	/**
	 * Validate input data to ensure it matches expected format.
	 *
	 * @param {any} input - The input to validate
	 * @param {string} type - The expected type
	 * @return {boolean} True if valid, false otherwise
	 */
	validateInput(input: any, type: string): boolean {
		switch (type) {
			case "string":
				return typeof input === "string";
			case "number":
				return typeof input === "number" && !Number.isNaN(input);
			case "date":
				return input instanceof Date && !Number.isNaN(input);
			case "array":
				return Array.isArray(input);
			case "object":
				return (
					typeof input === "object" && input !== null && !Array.isArray(input)
				);
			default:
				return false;
		}
	}

	/**
	 * Generate a unique ID for tracking purposes.
	 *
	 * @return {string} A unique identifier
	 */
	generateUniqueId(): string {
		return Utilities.getUuid();
	}

	/**
	 * Log message with timestamp.
	 *
	 * @param {string} message - The message to log
	 * @param {string} [level='INFO'] - The log level
	 */
	log(message: string, level: string = "INFO"): void {
		const timestamp = this.formatDate(new Date());
		Logger.log(`[${level}] ${timestamp} - ${message}`);
	}

	/**
	 * Returns the web application URL for the current script.
	 * This URL can be used to access the web app externally.
	 *
	 * @return {string} The URL of the deployed web app
	 */
	getWebAppUrl(): string {
		const service = ScriptApp.getService();
		const url = service.getUrl();
		return url;
	}

	/**
	 * Gets the OAuth token for the current script execution.
	 * @returns {string} The OAuth token.
	 */
	getOAuthToken(): string {
		const token = ScriptApp.getOAuthToken();
		return token;
	}
}

// Export singleton instance
const utility = new Utility();
export default utility;
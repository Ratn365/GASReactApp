/**
 * Service class for Google Apps Script Properties Service
 */
class PropertyService {
	/**
	 * Get all script properties
	 * @return {Record<string, string>} All script properties as an object
	 */
	getAllScriptProperties(): Record<string, string> {
		const properties = PropertiesService.getScriptProperties();
		return properties.getProperties();
	}

	/**
	 * Get a specific script property
	 * @param {string} key - The property key to retrieve
	 * @return {string | null} The property value
	 */
	getScriptProperty(key: string): string | null {
		const properties = PropertiesService.getScriptProperties();
		return properties.getProperty(key);
	}

	/**
	 * Set a script property
	 * @param {string} key - The property key to set
	 * @param {string} value - The property value to set
	 */
	setScriptProperty(key: string, value: string): void {
		const properties = PropertiesService.getScriptProperties();
		properties.setProperty(key, value);
	}

	/**
	 * Delete a script property
	 * @param {string} key - The property key to delete
	 */
	deleteScriptProperty(key: string): void {
		const properties = PropertiesService.getScriptProperties();
		properties.deleteProperty(key);
	}

	/**
	 * Get all user properties
	 * @return {Record<string, string>} All user properties as an object
	 */
	getAllUserProperties(): Record<string, string> {
		const properties = PropertiesService.getUserProperties();
		return properties.getProperties();
	}

	/**
	 * Get a specific user property
	 * @param {string} key - The property key to retrieve
	 * @return {string | null} The property value
	 */
	getUserProperty(key: string): string | null {
		const properties = PropertiesService.getUserProperties();
		return properties.getProperty(key);
	}

	/**
	 * Set a user property
	 * @param {string} key - The property key to set
	 * @param {string} value - The property value to set
	 */
	setUserProperty(key: string, value: string): void {
		const properties = PropertiesService.getUserProperties();
		properties.setProperty(key, value);
	}

	/**
	 * Get settings combining script properties and other sources
	 * @return {Record<string, string>} Combined settings
	 */
	getSettings(): Record<string, string> {
		const properties = PropertiesService.getScriptProperties();
		const settings = properties.getProperties();

		// Placeholder for additional settings sources
		const additionalSettings: Record<string, string> = {};

		// Merge all settings
		return { ...settings, ...additionalSettings };
	}
}

// Export as singleton
const propertyService = new PropertyService();
export default propertyService;

/**
 * Configuration utilities for storing and retrieving settings.
 */
export default class ConfigManager {

	/**
	 * Get all settings from script properties.
	 *
	 * @return {Record<string, string>} The current settings
	 */
	getSettings(): Record<string, string> {
		const properties = PropertiesService.getScriptProperties();
		const settings: Record<string, string> = properties.getProperties();
		return settings;
	}

	/**
	 * Save settings to script properties.
	 *
	 * @param {Record<string, string>} settings - The settings to save
	 */
	saveSettings(settings: Record<string, string>): void {
		if (!settings) return;

		const properties = PropertiesService.getScriptProperties();

		// Save each setting
		for (const key of Object.keys(settings)) {
			properties.setProperty(key, settings[key]);
		}
	}

	/**
	 * Get a specific setting value.
	 *
	 * @param {string} key - The setting key
	 * @param {string} [defaultValue=''] - Default value if setting is not found
	 * @return {string} The setting value
	 */
	getSetting(key: string, defaultValue: string = ""): string {
		const properties = PropertiesService.getScriptProperties();
		const value: string | null = properties.getProperty(key);
		return value || defaultValue;
	}
}
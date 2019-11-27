/**
 * ownCloud - Music app
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Pauli Järvinen <pauli.jarvinen@gmail.com>
 * @copyright Pauli Järvinen 2018
 */

/** @namespace */
var OC_Music_Utils = {

	/**
	 * Nextcloud 14 has a new overall layout structure which requires some
	 * changes on the application logic.
	 */
	newLayoutStructure: function() {
		// Detect the new structure from the presence of the #content-wrapper element.
		return $('#content-wrapper').length === 0;
	},

	/**
	 * Newer versions of Nextcloud come with a "dark theme" which may be activated
	 * from the accessibility settings. Test if the theme is active.
	 */
	darkThemeActive: function() {
		return OCA.hasOwnProperty('Accessibility') && OCA.Accessibility.theme == 'themedark';
	},

	/**
	 * Test if the string @a str starts with another string @a search
	 */
	startsWith: function(str, search) {
		return str !== null && search !== null && str.slice(0, search.length) === search;
	}
};
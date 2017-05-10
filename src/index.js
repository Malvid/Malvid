'use strict'

const fs   = require('fs')
const pify = require('pify')

/**
 * Return the HTML of the UI that can be viewed in the browser.
 * @public
 * @param {?*} filePath - Not used by this module.
 * @param {?Object} opts - Options.
 * @returns {Promise} Returns the following properties if resolved: {String}.
 */
module.exports = function(filePath, opts) {

	return Promise.resolve().then(() => {

		if (typeof opts!=='object' && opts!=null) throw new Error(`'opts' must be undefined, null or an object`)

	}).then(() => {

		// Get the components data
		return ''

	}).then((data) => {

		// const jsFile = './assets/client.js'

		// Get the contents of the js file and pass both js and data to next promise
		// return pify(fs.readFile)(jsFile, 'utf8').then((js) => ({
		// 	js,
		// 	data
		// }))

		return {}

	}).then(({ js, data }) => {

		// Render the page
		return ''

	}).then((str) => {

		return str

	})

}
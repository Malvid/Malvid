'use strict'

const path   = require('path')
// const pify   = require('pify')
const jsPath = path.resolve(__dirname, './client.js')
const js     = require('rosid-handler-js')(jsPath)
const server = require('./server')

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
		return {}

	}).then((data) => {

		// Use transformed js file and pass both js and data to next promise
		return js.then((js) => ({
			js,
			data
		}))

	}).then(({ js, data }) => {

		// Render the page
		return server(js, data)

	}).then((str) => {

		return str

	})

}
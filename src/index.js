'use strict'

const path = require('path')
const deepAssign = require('deep-assign')
const jsPath = path.resolve(__dirname, './client.js')
const js = require('rosid-handler-js')(jsPath)
const componentLookup = require('component-lookup')
const server = require('./server')

/**
 * Return the HTML of the UI that can be viewed in the browser.
 * @public
 * @param {?*} filePath - Not used by this module.
 * @param {?Object} opts - Options.
 * @returns {Promise} Returns the following properties if resolved: {String}.
 */
module.exports = function(filePath, opts = {}) {

	return Promise.resolve().then(() => {

		if (typeof opts!=='object' && opts!=null) throw new Error(`'opts' must be undefined, null or an object`)

		opts = deepAssign({
			componentLookup: {},
			siteData: {
				lang: 'en',
				title: 'Rosid',
				description: 'UI to help you build & document web components.'
			}
		}, opts)

	}).then(() => {

		// Get the components data
		return componentLookup(opts.componentLookup.pattern, opts.componentLookup.opts)

	}).then((components) => {

		// Use transformed js file and pass both js and components to next promise
		return js.then((js) => ({
			js,
			components
		}))

	}).then(({ js, components }) => {

		// Initial state of the site
		const initalState = {
			components : components,
			siteData   : opts.siteData
		}

		// Render the page
		return server(initalState, js)

	}).then((str) => {

		return str

	})

}
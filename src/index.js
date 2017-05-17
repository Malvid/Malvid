'use strict'

const path = require('path')
const deepAssign = require('deep-assign')
const isPlainObj = require('is-plain-obj')
const jsPath = path.resolve(__dirname, './client.js')
const js = require('rosid-handler-js')(jsPath, { optimize: false })
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

		if (isPlainObj(opts)===false && opts!=null) {
			throw new Error(`'opts' must be an object, null or undefined`)
		}

		const files = {
			view: (fileName, fileExt) => [ `${ fileName }.${ fileExt }` ],
			data: (fileName, fileExt) => [ `${ fileName }.data.json`, `${ fileName }.data.js` ],
			notes: (fileName, fileExt) => [ `${ fileName }.md` ]
		}

		opts = deepAssign({
			lang: 'en',
			title: 'Rosid',
			description: 'UI to help you build & document web components.',
			pattern: '**/[^_]*.{ejs,njk,html}',
			src: '',
			files: files
		}, opts)

	}).then(() => {

		// Get the components data
		return componentLookup(opts.pattern, opts.files, {
			cwd: opts.src
		})

	}).then((components) => {

		// Use transformed js file and pass both js and components to next promise
		return js.then((js) => ({
			js,
			components
		}))

	}).then(({ js, components }) => {

		// Initial state of the site
		const initalState = {
			components,
			opts
		}

		// Render the page
		return server(initalState, js)

	})

}
'use strict'

const path = require('path')
const deepAssign = require('deep-assign')
const isPlainObj = require('is-plain-obj')
const pify = require('pify')
const jsPath = path.resolve(__dirname, './client.js')
const js = require('rosid-handler-js')(jsPath, { optimize: false })
const componentsLookup = require('components-lookup')
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
			view: {
				languages: [ 'twig' ],
				resolver: (fileName, fileExt) => [ `${ fileName }${ fileExt }` ]
			},
			data: {
				languages: [ 'json', 'js' ],
				resolver: (fileName, fileExt) => [ `${ fileName }.data.json`, `${ fileName }.data.js` ]
			},
			notes: {
				languages: [ 'markdown' ],
				resolver: (fileName, fileExt) => [ `${ fileName }.md` ]
			}
		}

		opts = deepAssign({
			lang: 'en',
			title: 'Rosid',
			description: 'UI to help you build & document web components.',
			pattern: '**/[^_]*.{ejs,njk}',
			src: '',
			files: files
		}, opts)

	}).then(() => {

		// Component lookup only cares about the resolvers
		const resolvers = Object.keys(opts.files).reduce((acc, key) => {

			acc[key] = opts.files[key].resolver
			return acc

		}, {})

		// Get the components data
		return componentsLookup(opts.pattern, resolvers, {
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
		return pify(server)(initalState, js)

	}).then((str) => {

		return str

	})

}
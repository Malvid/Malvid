'use strict'

const path = require('path')
const isPlainObj = require('is-plain-obj')
const pify = require('pify')
const componentsLookup = require('components-lookup')
const server = require('./server')

const js = (() => {

	const filePath = path.resolve(__dirname, './client.js')
	const babel = { babelrc: false }
	const opts = { optimize: false, babel }

	// Load and transform js for the client
	return require('rosid-handler-js')(filePath, opts)

})()

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
			config: {
				languages: [ 'json', 'js' ],
				resolver: (fileName, fileExt) => [ `${ fileName }.config.json`, `${ fileName }.config.js` ]
			},
			notes: {
				languages: [ 'markdown' ],
				resolver: (fileName, fileExt) => [ `${ fileName }.md` ]
			}
		}

		const statuses = {
			wip: {
				label: 'WIP',
				description: 'Work in progress',
				color: '#fe913d'
			},
			pending: {
				label: 'Pending',
				description: 'Ready, but waiting for finalization',
				color: '#2d90e8'
			},
			ready: {
				label: 'Ready',
				description: 'Ready to implement',
				color: '#2bc052'
			}
		}

		opts = Object.assign({
			lang: 'en',
			title: 'Rosid',
			description: 'UI to help you build and document web components.',
			pattern: '**/[^_]*.{ejs,njk}',
			src: '',
			files,
			statuses
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

		// Add syntax highlighting support for output
		opts.files.output = {
			languages: [ 'html' ]
		}

		components.forEach((component) => {

			// Add output to each components. This placeholder will be filled by the UI,
			// but must exist too show up in the inspector.
			component.data.output = null

			// Config is a special kind of data and should be parsed
			if (component.data.config!=null) {
				try { component.data.config = JSON.parse(component.data.config) }
				catch (err) { throw new Error(`Failed to parse config of '${ component.name }' component`) }
			}

		})

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
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

		const resolvers = [
			{
				id: 'view',
				label: 'View',
				languages: [ 'twig' ],
				resolve: (fileName, fileExt) => [ `${ fileName }${ fileExt }` ]
			},
			{
				id: 'data',
				label: 'Data',
				languages: [ 'json', 'js' ],
				resolve: (fileName, fileExt) => [ `${ fileName }.data.json`, `${ fileName }.data.js` ]
			},
			{
				id: 'notes',
				label: 'Notes',
				languages: [ 'markdown' ],
				resolve: (fileName, fileExt) => [ `${ fileName }.md` ]
			},
			{
				id: 'config',
				label: 'Config',
				languages: [ 'json' ],
				parse: (contents) => JSON.parse(contents),
				resolve: (fileName, fileExt) => [ `${ fileName }.config.json` ]
			}
		]

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
			resolvers,
			statuses
		}, opts)

	}).then(() => {

		// Get the components data
		return componentsLookup(opts.pattern, opts.resolvers, {
			cwd: opts.src
		})

	}).then((components) => {

		// Use transformed js file and pass both js and components to next promise
		return js.then((js) => ({
			js,
			components
		}))

	}).then(({ js, components }) => {

		components.forEach((component) => {

			// Add output to each components. This placeholder will be filled by the UI,
			// but must exist too show up in the inspector.
			component.data.push({
				index: component.data.length,
				id: 'output',
				label: 'Output',
				languages: [ 'html' ],
				data: null
			})

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
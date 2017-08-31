'use strict'

const path = require('path')
const isPlainObj = require('is-plain-obj')
const pify = require('pify')
const componentsLookup = require('components-lookup')
const server = require('./server')

const clientJS = (() => {

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
 * @returns {Promise<String>} HTML of the UI or the state as a serialized JSON.
 */
module.exports = async function(filePath, opts = {}) {

	if (typeof filePath!=='string') throw new Error(`'filePath' must be a string`)
	if (isPlainObj(opts)===false && opts!=null) throw new Error(`'opts' must be an object, null or undefined`)

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
		src: '',
		pattern: '**/[^_]*.{ejs,njk}',
		resolvers,
		statuses
	}, opts)

	const components = await componentsLookup(opts.pattern, opts.resolvers, { cwd: opts.src })
	const js = await clientJS

	const state = {
		components,
		opts
	}

	const jsonRequest = filePath.substr(-5)==='.json'

	// Return the state when client requests JSON
	if (jsonRequest===true) return JSON.stringify(state)

	// Render the page
	return pify(server)(state, js)

}
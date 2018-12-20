'use strict'

const util = require('util')
const isPlainObj = require('is-plain-obj')
const componentsLookup = require('components-lookup')
const requireData = require('require-data')
const continuousStealthyRequire = require('continuous-stealthy-require')
const server = require('./server')
const script = require('./script')

/**
 * Returns the HTML and JSON of the UI.
 * @public
 * @param {?Object} opts - Options.
 * @returns {Promise<Object>} HTML and JSON of the UI.
 */
module.exports = async function(opts = {}) {

	if (isPlainObj(opts) === false && opts != null) throw new Error(`'opts' must be an object, null or undefined`)

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
			parse: async (contents, filePath) => {

				// Allow empty JSON files
				if ((await contents).trim() === '') return '{}'

				// Require uncached JS or JSON file and stringify it
				return JSON.stringify(requireData(filePath, continuousStealthyRequire), null, 2)

			},
			resolve: (fileName) => [ `${ fileName }.data.json`, `${ fileName }.data.js` ]
		},
		{
			id: 'notes',
			label: 'Notes',
			languages: [ 'markdown' ],
			resolve: (fileName) => [ `${ fileName }.md` ]
		},
		{
			id: 'config',
			label: 'Config',
			languages: [ 'json' ],
			parse: async (contents, filePath) => {

				// Allow empty JSON files
				if ((await contents).trim() === '') return {}

				// Require uncached JS or JSON
				return requireData(filePath, continuousStealthyRequire)

			},
			resolve: (fileName) => [ `${ fileName }.config.json`, `${ fileName }.config.js` ]
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
		title: 'Malvid',
		description: 'UI to help you build and document web components.',
		src: '',
		pattern: '**/[^_]*.{ejs,njk,hbs,twig}',
		url: (url) => url,
		resolvers,
		statuses
	}, opts)

	const components = await componentsLookup(opts.pattern, opts.resolvers, {
		cwd: opts.src,
		url: opts.url
	})

	const state = {
		components,
		opts
	}

	return {
		html: async () => {

			const js = await script

			return util.promisify(server)(state, js)

		},
		json: async () => {

			return state

		}
	}

}
'use strict'

const { readFile } = require('fs')
const { resolve } = require('path')
const { promisify } = require('util')
const isPlainObj = require('is-plain-obj')
const componentsLookup = require('components-lookup')

const server = require('./server')
const normalize = require('./styles/normalize')
const atomOneLight = require('./styles/atomOneLight')
const markdown = require('./styles/markdown')
const global = require('./styles/global')

const clientPath = resolve(__dirname, '../dist/client.min.js')
const clientData = promisify(readFile)(clientPath)

/**
 * Returns the HTML and JSON of the UI.
 * @public
 * @param {?Object} opts - Options.
 * @returns {Promise<Object>} HTML and JSON of the UI.
 */
module.exports = async function(opts = {}) {

	if (isPlainObj(opts) === false && opts != null) throw new Error(`'opts' must be an object, null or undefined`)

	const resolvers = [
		require('./resolvers/view'),
		require('./resolvers/data'),
		require('./resolvers/notes'),
		require('./resolvers/config')
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
		style: '',
		script: '',
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

			const css = `
				${ normalize }
				${ atomOneLight }
				${ markdown }
				${ global }
			`

			const js = await clientData

			return promisify(server)(state, css, js)

		},
		json: async () => {

			return state

		}
	}

}
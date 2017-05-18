'use strict'

const { h } = require('preact')
const { Provider } = require('preact-redux')
const render = require('preact-render-to-string')
const { css } = require('glamor')
const { renderStaticOptimized } = require('glamor/server')

const createStore = require('./utils/createStore')
const global = require('./styles/global')
const markdown = require('./styles/markdown')
const start = require('./layout/start')
const end = require('./layout/end')

const Main = require('./components/Main')

module.exports = (initalState, js, next) => {

	css.insert(global)
	css.insert(markdown)

	createStore(initalState, (err, store) => {

		if (err!=null) return next(err)

		const state = store.getState()
		const html = h(Provider, { store }, h(Main))
		const output = renderStaticOptimized(() => render(html))

		next(null, `
			${ start(state, output.css, output.ids) }
			${ output.html }
			${ end(state, js) }
		`)

	})

}
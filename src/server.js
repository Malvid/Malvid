'use strict'

const { Provider } = require('react-redux')
const { renderToString } = require('react-dom/server')
const { css } = require('glamor')
const { renderStaticOptimized } = require('glamor/server')

const h = require('./utils/h')
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
		const output = renderStaticOptimized(() => renderToString(html))

		next(null, `
			${ start(state, output.css, output.ids) }
			<div id="main">${ output.html }</div>
			${ end(state, js) }
		`)

	})

}
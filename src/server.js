'use strict'

const { h } = require('preact')
const render = require('preact-render-to-string')
const { css } = require('glamor')
const { renderStaticOptimized } = require('glamor/server')

const global = require('./styles/global')
const start = require('./layout/start')
const end = require('./layout/end')

const Main = require('./components/Main')

module.exports = (js, data) => {

	css.insert(global)

	const props  = data
	const output = renderStaticOptimized(() => render(
		h(Main, props)
	))

	return `
		${ start(props, output.css, output.ids) }
		${ output.html }
		${ end(props, js) }
	`

}
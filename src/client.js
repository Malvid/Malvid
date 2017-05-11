'use strict'

const { h, render } = require('preact')
const { css, rehydrate } = require('glamor')

const global = require('./styles/global')

const Main = require('./components/Main')

const output = (props) => {

	const root = document.body

	render(h(Main, props), root, root.firstElementChild)

}

const init = () => {

	const state = {
		glamor : window._state['glamor'],
		props  : window._state['props']
	}

	// Rehydrate glamor state
	rehydrate(state.glamor)

	// Inject global CSS
	css.insert(global)

	// Render component with the same props as the server
	output(state.props)

}

if (typeof window!=='undefined') init()
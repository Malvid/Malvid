'use strict'

const { h, render } = require('preact')
const { Provider } = require('preact-redux')
const { css, rehydrate } = require('glamor')

const isClient = require('./utils/isClient')
const createStore = require('./utils/createStore')

const Main = require('./components/Main')

const output = (store) => {

	const root = document.body
	const child = root.querySelector('#main')
	const html = h(Provider, { store }, h(Main))

	render(html, root, child)

}

const init = () => {

	// Rehydrate glamor state
	rehydrate(window.__GLAMOR__)

	// Rehydrate store from state
	createStore(window.__STATE__, (err, store) => {

		if (err!=null) throw err

		// Render component with the same props as the server
		output(store)

	})

}

if (isClient===true) init()
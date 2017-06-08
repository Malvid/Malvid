'use strict'

const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { css } = require('glamor')

const h = require('./utils/h')
const createStore = require('./utils/createStore')
const global = require('./styles/global')
const markdown = require('./styles/markdown')

const Main = require('./components/Main')

css.insert(global)
css.insert(markdown)

// Rehydrate store from state
createStore(window.__STATE__, (err, store) => {

	if (err!=null) throw err

	const root = document.querySelector('#main')
	const html = h(Provider, { store }, h(Main))

	// Render component with the same props as the server
	render(html, root)

})
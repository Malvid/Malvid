'use strict'

const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { css } = require('glamor')

const h = require('./utils/h')
const createStore = require('./utils/createStore')
const createHistory = require('./utils/createHistory')
const global = require('./styles/global')
const markdown = require('./styles/markdown')
const { setRoute } = require('./actions')

const Main = require('./components/Main')

css.insert(global)
css.insert(markdown)

// Rehydrate store from state
createStore(window.__STATE__, (err, store) => {

	if (err!=null) throw err

	const history = createHistory(store, setRoute)

	// Parse the initial location
	history.parse(history.location())

	// Reparse the location when the user navigates
	history.listen(history.parse)

	const root = document.querySelector('#main')
	const html = h(Provider, { store }, h(Main))

	// Render component with the state from the server
	render(html, root)

})
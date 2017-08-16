'use strict'

const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { css } = require('glamor')
const createHistory = require('history').createHashHistory

const h = require('./utils/h')
const createStore = require('./utils/createStore')
const parsePath = require('./utils/parsePath')
const requestState = require('./utils/requestState')
const global = require('./styles/global')
const markdown = require('./styles/markdown')
const { setRoute, hydrate } = require('./actions')

const Main = require('./components/Main')

css.insert(global)
css.insert(markdown)

const init = (initialState) => createStore(initialState, (err, store) => {

	if (err!=null) throw err

	const history = createHistory()

	// Set the state based on the location
	const parseLocation = (location) => {

		const components = store.getState().components
		const parsedPath = parsePath(location.pathname, components)
		const action = setRoute(parsedPath.componentId, parsedPath.tabId)

		store.dispatch(action)

	}

	// Parse the initial location
	parseLocation(history.location)

	// Reparse the location when the user navigates
	history.listen(parseLocation)

	const html = h(Provider, { store }, h(Main))
	const root = document.querySelector('#main')

	render(html, root)

})

requestState(location.href).then(init).catch(console.error)
'use strict'

const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { css } = require('glamor')
const keyboardJS = require('keyboardjs')
const createHistory = require('history').createHashHistory

const h = require('./utils/h')
const createStore = require('./utils/createStore')
const parsePath = require('./utils/parsePath')
const requestState = require('./utils/requestState')
const errorToState = require('./utils/errorToState')
const enhanceState = require('./utils/enhanceState')
const navigation = require('./utils/navigation')
const isInput = require('./utils/isInput')
const createRoute = require('./utils/createRoute')
const normalize = require('./styles/normalize')
const atomOneLight = require('./styles/atomOneLight')
const markdown = require('./styles/markdown')
const global = require('./styles/global')
const { setRoute } = require('./actions')

const Main = require('./components/Main')

css.insert(normalize)
css.insert(atomOneLight)
css.insert(markdown)
css.insert(global)

const init = (initialState) => createStore(initialState, (err, store) => {

	if (err != null) throw err

	const history = createHistory()

	// Set the state based on the location
	const parseLocation = (location) => {

		const state = store.getState()
		const { components } = enhanceState(state)
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

	const navigateToComponent = (nextComponent) => {

		const state = store.getState()
		const { currentTab } = enhanceState(state)

		location.href = createRoute(nextComponent.id, currentTab.id)

	}

	keyboardJS.bind('enter', (e) => {

		if (isInput(e.target) === false) return

		const nextComponent = navigation(store).firstComponent()

		if (nextComponent == null) return

		navigateToComponent(nextComponent)

	})

	keyboardJS.bind('up', () => {

		const nextComponent = navigation(store).prevComponent()

		if (nextComponent == null) return

		navigateToComponent(nextComponent)

	})

	keyboardJS.bind('down', () => {

		const nextComponent = navigation(store).nextComponent()

		if (nextComponent == null) return

		navigateToComponent(nextComponent)

	})

})

requestState(location.href)
	.then(init, (err) => init(errorToState(err)))
	.catch(console.error)
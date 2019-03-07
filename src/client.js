'use strict'

const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { isHotkey } = require('is-hotkey')
const createHistory = require('history').createHashHistory

const h = require('./utils/h')
const createStore = require('./utils/createStore')
const parsePath = require('./utils/parsePath')
const requestState = require('./utils/requestState')
const errorToState = require('./utils/errorToState')
const enhanceState = require('./utils/enhanceState')
const isInput = require('./utils/isInput')
const createNavigation = require('./utils/createNavigation')
const createRoute = require('./utils/createRoute')
const stopEvent = require('./utils/stopEvent')
const { setRoute, setFilter } = require('./actions')

const Main = require('./components/Main')

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

	// Curry the hotkey string for better performance
	const isClearKey = isHotkey('esc')
	const isConfirmKey = isHotkey('enter')
	const isPrevKey = isHotkey('up')
	const isNextKey = isHotkey('down')

	const navigateTo = (nextComponent, nextTab) => {

		if (nextComponent == null) return

		location.href = createRoute(nextComponent.id, nextTab.id)

	}

	const clearFilter = () => store.dispatch(setFilter(''))
	const focusFilter = () => document.querySelector('#filter').focus()

	document.documentElement.onkeydown = (e) => {

		const state = store.getState()
		const { components, filter, currentComponent, currentTab } = enhanceState(state)

		if (isClearKey(e) === true) {
			clearFilter()
			focusFilter()
			return stopEvent(e)
		}

		if (isConfirmKey(e) === true && isInput(e.target) === true) {
			const nextComponent = createNavigation(components, filter, currentComponent).firstComponent()
			navigateTo(nextComponent, currentTab)
			return stopEvent(e)
		}

		if (isPrevKey(e) === true) {
			const nextComponent = createNavigation(components, filter, currentComponent).prevComponent()
			navigateTo(nextComponent, currentTab)
			return stopEvent(e)
		}

		if (isNextKey(e) === true) {
			const nextComponent = createNavigation(components, filter, currentComponent).nextComponent()
			navigateTo(nextComponent, currentTab)
			return stopEvent(e)
		}

	}

})

requestState(location.href)
	.then(init, (err) => init(errorToState(err)))
	.catch(console.error)
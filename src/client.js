'use strict'

const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { css } = require('glamor')

const h = require('./utils/h')
const createStore = require('./utils/createStore')
const global = require('./styles/global')
const markdown = require('./styles/markdown')
const getComponent = require('./selectors/getComponent')
const getTab = require('./selectors/getTab')
const getTabs = require('./selectors/getTabs')

const history = require('./utils/history')()
const UrlPattern = require('url-pattern')
const { setRoute } = require('./actions')

const Main = require('./components/Main')

css.insert(global)
css.insert(markdown)

// Rehydrate store from state
createStore(window.__STATE__, (err, store) => {

	if (err!=null) throw err

	const root = document.querySelector('#main')
	const html = h(Provider, { store }, h(Main))

	const parse = (location) => {

		const components = store.getState().components
		const hasComponents = components.length>0

		// Do nothing when there're no components to show
		if (hasComponents===false) return

		const path = location.pathname
		const pattern = new UrlPattern('/(:componentId(/:tabId))')

		// Params is null when path is invalid
		const params = pattern.match(path) || {}
		const componentId = params.componentId
		const tabId = params.tabId

		// Use the specified or the first component depending on what's available
		const hasComponentId = getComponent(components, componentId)!=null
		const nextComponentId = hasComponentId===true ? componentId : components[0].id

		// Get data of the next component and check if it has the specified tab
		const nextComponent = getComponent(components, nextComponentId)
		const hasTabId = getTab(nextComponent, tabId)!=null

		// Use the specified or the first tab depending on what's available
		const nextTabId = hasTabId===true ? tabId : getTabs(nextComponent)[0].id

		store.dispatch(setRoute(nextComponentId, nextTabId))

	}

	// Parse the initial location
	parse(history.location)

	// Reparse the location when the user navigates
	history.listen(parse)

	// Render component with the state from the server
	render(html, root)

})
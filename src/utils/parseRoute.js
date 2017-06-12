const UrlPattern = require('url-pattern')

const getComponent = require('../selectors/getComponent')
const getTab = require('../selectors/getTab')
const getTabs = require('../selectors/getTabs')

const pattern = new UrlPattern('/(:componentId(/:tabId))')

module.exports = (location, components) => {

	const hasComponents = components.length>0

	// Reset route when there're no components to show
	if (hasComponents===false) return {
		componentId: null,
		tabId: null
	}

	// Params is null when path is invalid
	const params = pattern.match(location.pathname) || {}
	const componentId = params.componentId
	const tabId = params.tabId

	console.log(location.pathname);
	console.log(componentId);
	console.log(tabId);

	// Use the specified or the first component depending on what's available
	const hasComponentId = getComponent(components, componentId)!=null
	const nextComponentId = hasComponentId===true ? componentId : components[0].id

	// Get data of the next component and check if it has the specified tab
	const nextComponent = getComponent(components, nextComponentId)
	const hasTabId = getTab(nextComponent, tabId)!=null

	// Use the specified or the first tab depending on what's available
	const nextTabId = hasTabId===true ? tabId : getTabs(nextComponent)[0].id

	return {
		componentId: nextComponentId,
		tabId: nextTabId
	}

}
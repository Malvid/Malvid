'use strict'

const getComponent = require('../selectors/getComponent')
const getTab = require('../selectors/getTab')

module.exports = (state) => {

	const currentComponent = getComponent(state.components, state.route.componentId)
	const currentTab = getTab(currentComponent, state.route.tabId)

	return Object.assign({}, state, {
		currentComponent,
		currentTab
	})

}
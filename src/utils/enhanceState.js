const getComponent = require('../selectors/getComponent')
const getTab = require('../selectors/getTab')

module.exports = (state) => {

	// Replace currentComponent with real component data
	const currentComponent = getComponent(state.components, state.currentComponent)

	// Replace currentTab with real tab data
	const currentTab = getTab(currentComponent, state.currentTab)

	// Return complete state, but add/replace two props with computed values
	return Object.assign({}, state, {
		currentComponent,
		currentTab
	})

}
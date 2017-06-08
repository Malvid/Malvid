const getCurrentComponent = (components, componentId) => {

	const hasComponents = components.length>0

	// Don't show a component when there're no components
	if (hasComponents===false) return null

	const component = components.filter((component) => component.id===componentId)[0]
	const hasComponent = component!=null

	if (hasComponent===true) return component

	// Return the first component as fallback
	return components[0]

}

const getCurrentTab = (currentComponent, tabId) => {

	if (currentComponent==null) return null

	const data = currentComponent.data
	const hasData = Object.keys(data).length>0

	if (hasData===false) return null

	// A tab can be null when the content is empty, but not undefined
	const hasTab = data[tabId]!==undefined
	const firstTab = Object.keys(data)[0]

	if (hasTab===true) return tabId

	// Return the first tab as fallback
	return Object.keys(data)[0]

}

module.exports = (state) => {

	// Replace currentComponent with real component data or use the first component of all components
	const currentComponent = getCurrentComponent(state.components, state.currentComponent)

	// Replace currentTab with the current tab or the first tab of the currentComponent
	const currentTab = getCurrentTab(currentComponent, state.currentTab)

	// Return complete state, but add/replace two props with computed values
	return Object.assign({}, state, {
		currentComponent,
		currentTab
	})

}
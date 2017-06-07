const isClient = require('./isClient')

module.exports = (state) => {

	// Replace currentComponent with real component data or the first component of all components
	const currentComponent = (() => {

		const hasComponents = state.components.length>0

		// Don't show a component when there're no components
		if (hasComponents===false) return null

		const component = state.components.filter((component) => component.id===state.currentComponent)[0]
		const hasComponent = component!=null

		if (hasComponent===true) return component

		// Return the first component as fallback
		return state.components[0]

	})()

	// Replace currentTab with the current tab or the first tab of the currentComponent
	const currentTab = (() => {

		if (currentComponent==null) return null

		const data = currentComponent.data
		const hasData = Object.keys(data).length>0

		if (hasData===false) return null

		// A tab can be null when the content is empty, but not undefined
		const hasTab = data[state.currentTab]!==undefined
		const firstTab = Object.keys(data)[0]

		if (hasTab===true) return state.currentTab

		// Return the first tab as fallback
		return Object.keys(data)[0]

	})()

	// Return complete state, but add/replace two props with computed values
	return Object.assign({}, state, {
		currentComponent,
		currentTab
	})

}
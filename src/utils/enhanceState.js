const isClient = require('./isClient')

module.exports = (state) => {

	// Replace currentComponent with real component data or the first component of all components
	const currentComponent = (() => {

		// Don't set a currentComponent on the server as the client shows the last viewed component.
		// Rendering a component on the server only leads to an unnecessary flash of wrong content.
		if (isClient===false) return null

		const hasComponents = state.components.length>0

		// Don't show a component when there're no components
		if (hasComponents===false) return null

		const component = state.components.filter((component) => component.id===state.currentComponent)[0]
		const hasComponent = component!=null
		const firstComponent = state.components[0]

		return hasComponent===true ? component : firstComponent

	})()

	// Replace currentTab with the current tab or the first tab of the currentComponent
	const currentTab = (() => {

		if (currentComponent==null) return null

		const data = currentComponent.data
		const hasData = Object.keys(data).length>0

		if (hasData===false) return null

		const hasTab = data[state.currentTab]!=null
		const firstTab = Object.keys(data)[0]

		return hasTab===true ? state.currentTab : firstTab

	})()

	// Return complete state, but add/replace two props with computed values
	return Object.assign({}, state, {
		currentComponent,
		currentTab
	})

}
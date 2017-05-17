module.exports = (state) => {

	// Replace currentComponent id with the real component object
	const currentComponent = state.components.filter((component) => component.id===state.currentComponent)[0]

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
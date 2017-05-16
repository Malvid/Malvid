module.exports = (state) => {

	// Replace currentComponent id with the real component object
	const currentComponent = state.components.filter((component) => component.id===state.currentComponent)[0]

	// Return complete state, but add/replace two props with computed values
	return Object.assign({}, state, {
		currentComponent
	})

}
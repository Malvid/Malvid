const { SET_CURRENT_COMPONENT } = require('./types')

const setCurrentComponent = (componentId) => ({
	type: SET_CURRENT_COMPONENT,
	componentId
})

module.exports = {
	setCurrentComponent
}
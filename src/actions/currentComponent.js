const { SET_CURRENT_COMPONENT } = require('../constants/actions')

const setCurrentComponent = (componentId) => ({
	type: SET_CURRENT_COMPONENT,
	componentId
})

module.exports = {
	setCurrentComponent
}
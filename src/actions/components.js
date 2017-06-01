const { SET_COMPONENT_DATA } = require('../constants/actions')

const setComponentData = (componentId, dataId, data) => ({
	type: SET_COMPONENT_DATA,
	componentId,
	dataId,
	data
})

module.exports = {
	setComponentData
}
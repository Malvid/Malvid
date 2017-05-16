const { SET_CURRENT_COMPONENT } = require('../actions/types')

const setCurrentComponent = function(state, componentId) {

	return componentId

}

module.exports = function(state = null, action) {

	switch (action.type) {
		case SET_CURRENT_COMPONENT : return setCurrentComponent(state, action.componentId)
		default                    : return state
	}

}
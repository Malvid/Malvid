const { SET_CURRENT_COMPONENT } = require('../constants/actions')

const setCurrentComponent = (state, componentId) => componentId

module.exports = (state = null, action) => {

	switch (action.type) {
		case SET_CURRENT_COMPONENT : return setCurrentComponent(state, action.componentId)
		default                    : return state
	}

}
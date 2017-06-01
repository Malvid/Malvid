const update = require('immutability-helper')

const { SET_COMPONENT_DATA } = require('../constants/actions')

const setComponentData = (state, componentId, dataId, data) => {

	let index = state.reduce((acc, component, i) => {

		if (component.id===componentId) acc = i

		return acc

	}, null)

	return update(state, {
		[index]: { data: { $merge: { [dataId]: data } } }
	})

}

module.exports = function(state = [], action) {

	switch (action.type) {
		case SET_COMPONENT_DATA : return setComponentData(state, action.componentId, action.dataId, action.data)
		default                 : return state
	}

}
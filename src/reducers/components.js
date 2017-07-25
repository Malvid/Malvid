'use strict'

const update = require('immutability-helper')

const getComponent = require('../selectors/getComponent')
const getTab = require('../selectors/getTab')

const { SET_COMPONENT_DATA } = require('../constants/actions')

const setComponentData = (state, componentId, dataId, data) => {

	const component = getComponent(state, componentId)
	const tab = getTab(component, dataId)

	return update(state, {
		[component.index]: { data: { [tab.index]: { $merge: { data } } } }
	})

}

module.exports = function(state = [], action) {

	switch (action.type) {
		case SET_COMPONENT_DATA: return setComponentData(state, action.componentId, action.dataId, action.data)
		default: return state
	}

}
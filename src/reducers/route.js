'use strict'

const { SET_ROUTE } = require('../constants/actions')

const setRoute = (state, componentId, tabId) => ({
	componentId,
	tabId
})

module.exports = (state = {}, action) => {

	switch (action.type) {
		case SET_ROUTE : return setRoute(state, action.componentId, action.tabId)
		default        : return state
	}

}
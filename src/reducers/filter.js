'use strict'

const { SET_FILTER } = require('../constants/actions')

const setFilter = (state, filter) => filter

module.exports = (state = '', action) => {

	switch (action.type) {
		case SET_FILTER: return setFilter(state, action.filter)
		default: return state
	}

}
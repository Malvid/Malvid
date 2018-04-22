'use strict'

const { SET_SIZE_STATUS, SET_SIZE_VERTICAL, SET_SIZE_HORIZONTAL } = require('../constants/actions')
const { SIZE_STATUS_INACTIVE, SIZE_STATUS_ACTIVE } = require('../constants/size')

const defaultState = {
	status: SIZE_STATUS_INACTIVE,
	vertical: 0,
	horizontal: 0
}

const setSizeStatus = ({ vertical, horizontal }, status) => ({
	status: status === SIZE_STATUS_ACTIVE ? SIZE_STATUS_ACTIVE : SIZE_STATUS_INACTIVE,
	vertical,
	horizontal
})

const setSizeVertical = ({ status, horizontal }, size) => ({
	status,
	vertical: size,
	horizontal
})

const setSizeHorizontal = ({ status, vertical }, size) => ({
	status,
	vertical,
	horizontal: size
})

module.exports = (state = defaultState, action) => {

	switch (action.type) {
		case SET_SIZE_STATUS: return setSizeStatus(state, action.status)
		case SET_SIZE_VERTICAL: return setSizeVertical(state, action.size)
		case SET_SIZE_HORIZONTAL: return setSizeHorizontal(state, action.size)
		default: return state
	}

}
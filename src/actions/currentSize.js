'use strict'

const { SET_CURRENT_SIZE_STATUS, SET_CURRENT_SIZE_VERTICAL, SET_CURRENT_SIZE_HORIZONTAL } = require('../constants/actions')

const setCurrentSizeStatus = (status) => ({
	type: SET_CURRENT_SIZE_STATUS,
	status
})

const setCurrentSizeVertical = (size) => ({
	type: SET_CURRENT_SIZE_VERTICAL,
	size
})

const setCurrentSizeHorizontal = (size) => ({
	type: SET_CURRENT_SIZE_HORIZONTAL,
	size
})

module.exports = {
	setCurrentSizeStatus,
	setCurrentSizeVertical,
	setCurrentSizeHorizontal
}

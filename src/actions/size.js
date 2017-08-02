'use strict'

const { SET_SIZE_STATUS, SET_SIZE_VERTICAL, SET_SIZE_HORIZONTAL } = require('../constants/actions')

const setSizeStatus = (status) => ({
	type: SET_SIZE_STATUS,
	status
})

const setSizeVertical = (size) => ({
	type: SET_SIZE_VERTICAL,
	size
})

const setSizeHorizontal = (size) => ({
	type: SET_SIZE_HORIZONTAL,
	size
})

module.exports = {
	setSizeStatus,
	setSizeVertical,
	setSizeHorizontal
}

'use strict'

const {
	SET_COMPONENT_DATA,
	SET_ROUTE,
	SET_CURRENT_SIZE_STATUS,
	SET_CURRENT_SIZE_VERTICAL,
	SET_CURRENT_SIZE_HORIZONTAL
} = require('../constants/actions')

const { setComponentData } = require('./components')
const { setRoute } = require('./route')
const { setCurrentSizeStatus, setCurrentSizeVertical, setCurrentSizeHorizontal } = require('./currentSize')

module.exports = {
	SET_COMPONENT_DATA,
	SET_ROUTE,
	SET_CURRENT_SIZE_STATUS,
	SET_CURRENT_SIZE_VERTICAL,
	SET_CURRENT_SIZE_HORIZONTAL,
	setComponentData,
	setRoute,
	setCurrentSizeStatus,
	setCurrentSizeVertical,
	setCurrentSizeHorizontal
}
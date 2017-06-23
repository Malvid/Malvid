'use strict'

const { setComponentData } = require('./components')
const { setRoute } = require('./route')
const { setCurrentSizeStatus, setCurrentSizeVertical, setCurrentSizeHorizontal } = require('./currentSize')

module.exports = {
	setComponentData,
	setRoute,
	setCurrentSizeStatus,
	setCurrentSizeVertical,
	setCurrentSizeHorizontal
}
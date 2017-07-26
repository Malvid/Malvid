'use strict'

const { setRoute } = require('./route')
const { setCurrentSizeStatus, setCurrentSizeVertical, setCurrentSizeHorizontal } = require('./currentSize')
const hydrate = require('./hydrate')

module.exports = {
	setRoute,
	setCurrentSizeStatus,
	setCurrentSizeVertical,
	setCurrentSizeHorizontal,
	hydrate
}
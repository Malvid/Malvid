'use strict'

const { setRoute } = require('./route')
const { setSizeStatus, setSizeVertical, setSizeHorizontal } = require('./size')
const hydrate = require('./hydrate')

module.exports = {
	setRoute,
	setSizeStatus,
	setSizeVertical,
	setSizeHorizontal,
	hydrate
}
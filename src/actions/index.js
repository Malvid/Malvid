'use strict'

const { setFilter } = require('./filter')
const { setRoute } = require('./route')
const { setSizeStatus, setSizeVertical, setSizeHorizontal } = require('./size')
const hydrate = require('./hydrate')

module.exports = {
	setFilter,
	setRoute,
	setSizeStatus,
	setSizeVertical,
	setSizeHorizontal,
	hydrate
}
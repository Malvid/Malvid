'use strict'

const { SET_ROUTE } = require('../constants/actions')

const setRoute = (componentId, tabId) => ({
	type: SET_ROUTE,
	componentId,
	tabId
})

module.exports = {
	setRoute
}
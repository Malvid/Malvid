'use strict'

const { SET_FILTER } = require('../constants/actions')

const setFilter = (filter) => ({
	type: SET_FILTER,
	filter
})

module.exports = {
	setFilter
}
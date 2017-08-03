'use strict'

const { combineReducers } = require('redux')

const filter = require('./filter')
const route = require('./route')
const size = require('./size')
const components = require('./components')
const opts = require('./opts')

module.exports = combineReducers({
	filter,
	route,
	size,
	components,
	opts
})
'use strict'

const { combineReducers } = require('redux')

const components = require('./components')
const route = require('./route')
const size = require('./size')
const opts = require('./opts')

module.exports = combineReducers({
	components,
	route,
	size,
	opts
})
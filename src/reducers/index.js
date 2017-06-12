'use strict'

const { combineReducers } = require('redux')

const components = require('./components')
const route = require('./route')
const currentSize = require('./currentSize')
const opts = require('./opts')

module.exports = combineReducers({
	components,
	route,
	currentSize,
	opts
})
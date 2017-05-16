'use strict'

const { combineReducers } = require('redux')

const components = require('./components')
const currentComponent = require('./currentComponent')
const opts = require('./opts')

module.exports = combineReducers({
	components,
	currentComponent,
	opts
})
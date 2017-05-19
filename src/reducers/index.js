'use strict'

const { combineReducers } = require('redux')

const components = require('./components')
const currentComponent = require('./currentComponent')
const currentTab = require('./currentTab')
const currentSize = require('./currentSize')
const opts = require('./opts')

module.exports = combineReducers({
	components,
	currentComponent,
	currentTab,
	currentSize,
	opts
})
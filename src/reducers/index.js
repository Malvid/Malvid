'use strict'

const { combineReducers } = require('redux')

const components = require('./components')
const currentComponent = require('./currentComponent')
const siteData = require('./siteData')

module.exports = combineReducers({
	components,
	currentComponent,
	siteData
})
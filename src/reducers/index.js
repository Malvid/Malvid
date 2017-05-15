'use strict'

const { combineReducers } = require('redux')

const components = require('./components')
const siteData = require('./siteData')

module.exports = combineReducers({
	components,
	siteData
})
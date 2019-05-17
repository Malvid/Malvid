'use strict'

const getTab = require('./getTab')

module.exports = (component) => {

	const config = getTab(component, 'config')

	// The config is optional
	if (config == null) return null
	if (config.data == null) return null

	// The status is optional
	if (config.data.status == null) return null

	return status

}
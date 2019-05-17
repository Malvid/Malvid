'use strict'

const getTab = require('./getTab')

module.exports = (component) => {

	const config = getTab(component, 'config')

	// The config is optional
	if (config == null) return true
	if (config.data == null) return true

	// Only return false when preview is false
	if (config.data.preview === false) return false

	// Return the default
	return true

}
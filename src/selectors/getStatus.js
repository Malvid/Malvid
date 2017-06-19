'use strict'

const getTab = require('./getTab')

module.exports = (statuses, component) => {

	const config = getTab(component, 'config')

	// The config is optional
	if (config==null) return null
	if (config.data==null) return null

	// Returns undefined when the config has no status
	return statuses[config.data.status]

}
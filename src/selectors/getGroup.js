'use strict'

const getTab = require('./getTab')

module.exports = (component) => {

	const config = getTab(component, 'config')

	// The config is optional
	if (config==null) return null
	if (config.data==null) return null

	const group = config.data.group

	// Returns undefined when the config has no group
	return group==null ? group : group.toLowerCase()

}
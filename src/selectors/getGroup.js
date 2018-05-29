'use strict'

const getTab = require('./getTab')

module.exports = (component) => {

	const config = getTab(component, 'config')

	// The config is optional
	if (config == null) return null
	if (config.data == null) return null

	const rawGroup = config.data.group

	// The group is optional
	if (rawGroup == null) return null

	const polishedGroup = rawGroup.toLowerCase().trim()

	// An empty group is not a group
	if (polishedGroup === '') return null

	return polishedGroup

}
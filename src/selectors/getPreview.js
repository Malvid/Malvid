'use strict'

const getTab = require('./getTab')

module.exports = (component) => {

	const config = getTab(component, 'config')

	// The config is optional
	if (config == null) return true
	if (config.data == null) return true

	const previewStatus = config.data.preview

	// The group is optional
	if (previewStatus == null || previewStatus === '') return true

	return previewStatus

}
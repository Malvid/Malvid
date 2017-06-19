'use strict'

module.exports = (component, tabId) => {

	if (component==null) return null
	if (component.data==null) return null

	return component.data.filter((tab) => tab.id===tabId)[0]

}
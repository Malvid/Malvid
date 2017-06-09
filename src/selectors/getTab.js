const getTabs = require('./getTabs')

module.exports = (component, tabId) => {

	const tabs = getTabs(component)

	return tabs==null ? null : component.data[tabId]

}
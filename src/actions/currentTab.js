const { SET_CURRENT_TAB } = require('./types')

const setCurrentTab = (tabId) => ({
	type: SET_CURRENT_TAB,
	tabId
})

module.exports = {
	setCurrentTab
}
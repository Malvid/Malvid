const { SET_CURRENT_TAB } = require('../constants/actions')

const setCurrentTab = (tabId) => ({
	type: SET_CURRENT_TAB,
	tabId
})

module.exports = {
	setCurrentTab
}
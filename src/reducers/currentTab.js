const { SET_CURRENT_TAB } = require('../actions/types')

const setCurrentTab = function(state, tabId) {

	return tabId

}

module.exports = function(state = null, action) {

	switch (action.type) {
		case SET_CURRENT_TAB : return setCurrentTab(state, action.tabId)
		default              : return state
	}

}
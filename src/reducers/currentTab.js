const { SET_CURRENT_TAB } = require('../actions/types')

const setCurrentTab = (state, tabId) => tabId

module.exports = (state = null, action) => {

	switch (action.type) {
		case SET_CURRENT_TAB : return setCurrentTab(state, action.tabId)
		default              : return state
	}

}
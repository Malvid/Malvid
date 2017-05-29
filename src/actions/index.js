const {
	SET_CURRENT_COMPONENT,
	SET_CURRENT_TAB,
	SET_CURRENT_SIZE_STATUS,
	SET_CURRENT_SIZE_VERTICAL,
	SET_CURRENT_SIZE_HORIZONTAL
} = require('../constants/actions')

const { setCurrentComponent } = require('./currentComponent')
const { setCurrentTab } = require('./currentTab')
const { setCurrentSizeStatus, setCurrentSizeVertical, setCurrentSizeHorizontal } = require('./currentSize')

module.exports = {
	SET_CURRENT_COMPONENT,
	SET_CURRENT_TAB,
	SET_CURRENT_SIZE_STATUS,
	SET_CURRENT_SIZE_VERTICAL,
	SET_CURRENT_SIZE_HORIZONTAL,
	setCurrentComponent,
	setCurrentTab,
	setCurrentSizeStatus,
	setCurrentSizeVertical,
	setCurrentSizeHorizontal
}
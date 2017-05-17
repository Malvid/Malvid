const {
	SET_CURRENT_COMPONENT,
	SET_CURRENT_TAB
} = require('./types')

const { setCurrentComponent } = require('./currentComponent')
const { setCurrentTab } = require('./currentTab')

module.exports = {
	SET_CURRENT_COMPONENT,
	SET_CURRENT_TAB,
	setCurrentComponent,
	setCurrentTab
}
const isClient = require('./isClient')
const enhanceState = require('./enhanceState')
const { CURRENT_SIZE_STATUS_ACTIVE } = require('../constants/currentSize')

module.exports = (store) => (next) => (action) => {

	next(action)

	// Get state after executing the action
	const nextState = enhanceState(store.getState())

	// Sync data that is not part of a component
	if (isClient===true) {

		if (nextState.currentComponent!=null) document.title = `${ nextState.currentComponent.name } | ${ nextState.opts.title }`
		else document.title = nextState.opts.title

	}

	return nextState

}
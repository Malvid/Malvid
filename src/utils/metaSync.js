const isClient = require('./isClient')
const enhanceState = require('./enhanceState')

module.exports = (store) => (next) => (action) => {

	next(action)

	// Get state after executing the action
	const nextState = enhanceState(store.getState())

	// Sync metadata that is not part of a currentComponent
	if (isClient===true) document.title = `${ nextState.currentComponent.name } | ${ nextState.opts.title }`

	return nextState

}
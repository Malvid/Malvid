const isClient = require('./isClient')
const enhanceState = require('./enhanceState')

module.exports = (store) => (next) => (action) => {

	next(action)

	// Get state after executing the action
	const nextState = enhanceState(store.getState())

	// Sync data that is not part of a component
	if (isClient===true) {

		document.title = `${ nextState.currentComponent.name } | ${ nextState.opts.title }`

		document.documentElement.style.setProperty('--currentSize-vertical', `${ nextState.currentSize.vertical }px`)
		document.documentElement.style.setProperty('--currentSize-horizontal', `${ nextState.currentSize.horizontal }px`)

	}

	return nextState

}
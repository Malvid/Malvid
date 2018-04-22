'use strict'

module.exports = (reducers, type) => (state, action) => {

	if (action.type !== type) return reducers(state, action)

	// Assign action.state into original state to keep new keys in state
	const nextState = Object.assign({}, state, action.state)

	return reducers(nextState, action)

}
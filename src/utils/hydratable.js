'use strict'

module.exports = (reducers, type) => (state, action) => {

	if (action.type!==type) return reducers(state, action)

	// Keep the data generated during runtime
	const nextState = Object.assign({}, action.state, {
		currentSize: state.currentSize,
		route: state.route
	})

	return reducers(nextState, action)

}
'use strict'

const { compose, createStore } = require('redux')
const { persistStore, autoRehydrate } = require('redux-persist')

const hydratable = require('./hydratable')
const { HYDRATE } = require('../constants/actions')

// Make reducers hydratable by wrapping a function around
const reducers = hydratable(
	require('../reducers'),
	HYDRATE
)

// Enhance the store with third-party capabilities
const enhancers = compose(
	autoRehydrate()
)

// Reducers to persist
const whitelist = []

// Create the store
module.exports = (state, next) => {

	const store = createStore(reducers, state, enhancers)

	// Begin periodically persisting the store
	persistStore(store, { whitelist }, () => {

		// Rehydration complete
		next(null, store)

	})

}
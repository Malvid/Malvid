'use strict'

const { compose, createStore } = require('redux')
const { persistStore, autoRehydrate } = require('redux-persist')

const reducers = require('../reducers')

// Enhance the store with third-party capabilities
const enhancers = compose(
	autoRehydrate()
)

// Reducers to persist
const whitelist = [
	'currentComponent',
	'currentTab'
]

// Create the store
module.exports = (state) => {

	const store = createStore(reducers, state, enhancers)

	// Begin periodically persisting the store
	persistStore(store, { whitelist })

	return store

}
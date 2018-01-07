'use strict'

const { createStore } = require('redux')

const hydratable = require('./hydratable')
const isClient = require('./isClient')
const { HYDRATE } = require('../constants/actions')

// Make reducers hydratable by wrapping a function around
const reducers = hydratable(
	require('../reducers'),
	HYDRATE
)

// Enhance the store with DevTools
const hasDevTools = isClient===true && typeof window.__REDUX_DEVTOOLS_EXTENSION__==='function'
const devTools = hasDevTools===true ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined

// Create the store
module.exports = (state, next) => {

	const store = createStore(reducers, state, devTools)

	next(null, store)

}
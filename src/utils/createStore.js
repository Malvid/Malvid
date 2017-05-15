'use strict'

const { createStore } = require('redux')

const reducers = require('../reducers')

// Create the store
module.exports = (state) => createStore(reducers, state)
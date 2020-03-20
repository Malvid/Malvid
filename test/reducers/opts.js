'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const opts = require('../../src/reducers/opts')

describe('opts()', function() {

	it('should return initial state', function() {

		const state = undefined
		const action = {}
		const nextState = opts(state, action)

		assert.deepEqual(nextState, {})

	})

	it('should return existing state', function() {

		const state = { title: uuid() }
		const action = {}
		const nextState = opts(state, action)

		assert.deepEqual(nextState, state)

	})

})
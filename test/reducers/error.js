'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const error = require('../../src/reducers/error')

describe('error()', function() {

	it('should return initial state', function() {

		const state = undefined
		const action = {}
		const nextState = error(state, action)

		assert.strictEqual(nextState, null)

	})

	it('should return existing state', function() {

		const state = uuid()
		const action = {}
		const nextState = error(state, action)

		assert.strictEqual(nextState, state)

	})

})
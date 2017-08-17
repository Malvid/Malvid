'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const components = require('../../src/reducers/components')

describe('components', function() {

	it('should return initial state', function() {

		const state = undefined
		const action = {}
		const nextState = components(state, action)

		assert.deepEqual(nextState, [])

	})

	it('should return existing state', function() {

		const state = [ uuid() ]
		const action = {}
		const nextState = components(state, action)

		assert.deepEqual(nextState, state)

	})

})
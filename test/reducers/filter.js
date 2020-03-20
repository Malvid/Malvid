'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const { SET_FILTER } = require('../../src/constants/actions')
const filter = require('../../src/reducers/filter')

describe('filter()', function() {

	it('should return initial state', function() {

		const state = undefined
		const action = {}
		const nextState = filter(state, action)

		assert.strictEqual(nextState, '')

	})

	it('should return existing state', function() {

		const state = uuid()
		const action = {}
		const nextState = filter(state, action)

		assert.strictEqual(nextState, state)

	})

	it('should handle SET_FILTER', function() {

		const state = undefined
		const action = {
			type: SET_FILTER,
			filter: uuid()
		}

		const nextState = filter(state, action)

		assert.strictEqual(nextState, action.filter)

	})

})
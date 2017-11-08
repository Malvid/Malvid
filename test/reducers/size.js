'use strict'

const assert = require('chai').assert
const { SET_SIZE_STATUS, SET_SIZE_VERTICAL, SET_SIZE_HORIZONTAL } = require('../../src/constants/actions')
const { SIZE_STATUS_INACTIVE, SIZE_STATUS_ACTIVE } = require('../../src/constants/size')
const size = require('../../src/reducers/size')

describe('size()', function() {

	it('should return initial state', function() {

		const state = undefined
		const action = {}
		const nextState = size(state, action)

		assert.deepEqual(nextState, {
			status: SIZE_STATUS_INACTIVE,
			vertical: 0,
			horizontal: 0
		})

	})

	it('should return existing state', function() {

		const state = {
			status: SIZE_STATUS_ACTIVE,
			vertical: 100,
			horizontal: 100
		}

		const action = {}
		const nextState = size(state, action)

		assert.deepEqual(nextState, state)

	})

	it('should handle SET_SIZE_STATUS', function() {

		const state = undefined
		const action = {
			type: SET_SIZE_STATUS,
			status: SIZE_STATUS_ACTIVE
		}

		const nextState = size(state, action)

		assert.strictEqual(nextState.status, action.status)
		assert.property(nextState, 'vertical')
		assert.property(nextState, 'horizontal')

	})

	it('should handle SET_SIZE_STATUS with incorrect status', function() {

		const state = undefined
		const action = {
			type: SET_SIZE_STATUS,
			status: ''
		}

		const nextState = size(state, action)

		assert.strictEqual(nextState.status, SIZE_STATUS_INACTIVE)
		assert.property(nextState, 'vertical')
		assert.property(nextState, 'horizontal')

	})

	it('should handle SET_SIZE_VERTICAL', function() {

		const state = undefined
		const action = {
			type: SET_SIZE_VERTICAL,
			size: 100
		}

		const nextState = size(state, action)

		assert.property(nextState, 'status')
		assert.strictEqual(nextState.vertical, action.size)
		assert.property(nextState, 'horizontal')

	})

	it('should handle SET_SIZE_HORIZONTAL', function() {

		const state = undefined
		const action = {
			type: SET_SIZE_HORIZONTAL,
			size: 100
		}

		const nextState = size(state, action)

		assert.property(nextState, 'status')
		assert.property(nextState, 'vertical')
		assert.strictEqual(nextState.horizontal, action.size)

	})

})
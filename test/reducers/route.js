'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const { SET_ROUTE } = require('../../src/constants/actions')
const route = require('../../src/reducers/route')

describe('route', function() {

	it('should return initial state', function() {

		const state = undefined
		const action = {}
		const nextState = route(state, action)

		assert.deepEqual(nextState, {})

	})

	it('should return existing state', function() {

		const state = {
			componentId: uuid(),
			tabId: uuid()
		}

		const action = {}
		const nextState = route(state, action)

		assert.deepEqual(nextState, state)

	})

	it('should handle SET_ROUTE', function() {

		const state = undefined
		const action = {
			type: SET_ROUTE,
			componentId: uuid(),
			tabId: uuid()
		}

		const nextState = route(state, action)

		assert.deepEqual(nextState, {
			componentId: action.componentId,
			tabId: action.tabId
		})

	})

})
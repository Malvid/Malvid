'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const route = require('../../src/actions/route')

describe('route', function() {

	it('should be an object', function() {

		assert.isObject(route)

	})

	it('should have a setRoute function that returns an action object', function() {

		const setRoute = route.setRoute

		assert.isFunction(setRoute)

		const componentId = uuid()
		const tabId = uuid()
		const action = setRoute(componentId, tabId)

		assert.isObject(action)
		assert.property(action, 'type')
		assert.strictEqual(action.componentId, componentId)
		assert.strictEqual(action.tabId, tabId)

	})

})
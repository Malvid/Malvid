'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const filter = require('../../src/actions/filter')

describe('filter', function() {

	it('should be an object', function() {

		assert.isObject(filter)

	})

	it('should have a setFilter function that returns an action object', function() {

		const setFilter = filter.setFilter

		assert.isFunction(setFilter)

		const _filter = uuid()
		const action = setFilter(_filter)

		assert.isObject(action)
		assert.property(action, 'type')
		assert.strictEqual(action.filter, _filter)

	})

})
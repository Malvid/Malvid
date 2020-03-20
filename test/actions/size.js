'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const size = require('../../src/actions/size')

describe('size', function() {

	it('should be an object', function() {

		assert.isObject(size)

	})

	it('should have a setSizeStatus function that returns an action object', function() {

		const setSizeStatus = size.setSizeStatus

		assert.isFunction(setSizeStatus)

		const status = uuid()
		const action = setSizeStatus(status)

		assert.isObject(action)
		assert.property(action, 'type')
		assert.strictEqual(action.status, status)

	})

	it('should have a setSizeVertical function that returns an action object', function() {

		const setSizeVertical = size.setSizeVertical

		assert.isFunction(setSizeVertical)

		const _size = uuid()
		const action = setSizeVertical(_size)

		assert.isObject(action)
		assert.property(action, 'type')
		assert.strictEqual(action.size, _size)

	})

	it('should have a setSizeHorizontal function that returns an action object', function() {

		const setSizeHorizontal = size.setSizeHorizontal

		assert.isFunction(setSizeHorizontal)

		const _size = uuid()
		const action = setSizeHorizontal(_size)

		assert.isObject(action)
		assert.property(action, 'type')
		assert.strictEqual(action.size, _size)

	})

})
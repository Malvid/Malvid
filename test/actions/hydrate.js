'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const hydrate = require('../../src/actions/hydrate')

describe('hydrate()', function() {

	it('should be a function that returns an action object', function() {

		assert.isFunction(hydrate)

		const val = uuid()
		const action = hydrate(val)

		assert.isObject(action)
		assert.property(action, 'type')
		assert.strictEqual(action.state, val)

	})

})
'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const view = require('../../src/resolvers/view')

describe('view', function() {

	it('should be an object with resolver specific properties', function() {

		assert.isObject(view)
		assert.isString(view.id)
		assert.isString(view.label)
		assert.isArray(view.languages)
		assert.isFunction(view.resolve)

	})

	it('should have a resolve function that returns an array', function() {

		const filename = uuid()
		const result = view.resolve(filename)

		assert.isArray(result)

	})

})
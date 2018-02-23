'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const createRoute = require('../../src/utils/createRoute')

describe('createRoute()', function() {

	it('should return a URL', function() {

		const componentId = uuid()
		const tabId = uuid()

		const result = createRoute(componentId, tabId)

		assert.strictEqual(result, `#/${ componentId }/${ tabId }`)

	})

})
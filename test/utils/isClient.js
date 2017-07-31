'use strict'

const assert = require('chai').assert
const isClient = require('../../src/utils/isClient')

describe('isClient', function() {

	it('should return false when tested on a server', function() {

		const result = isClient

		assert.strictEqual(result, false)

	})

})
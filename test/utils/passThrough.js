'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const passThrough = require('../../src/utils/passThrough')

describe('passThrough()', function() {

	it('should return the input', function() {

		const _ = uuid()

		const result = passThrough(_)

		assert.strictEqual(result, _)

	})

})
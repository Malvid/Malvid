'use strict'

const assert = require('chai').assert
const mousePos = require('../../src/utils/mousePos')

describe('mousePos()', function() {

	it('should return null when tested on a server', function() {

		const result = mousePos

		assert.strictEqual(result, null)

	})

})
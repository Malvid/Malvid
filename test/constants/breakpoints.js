'use strict'

const assert = require('chai').assert
const breakpoints = require('../../src/constants/breakpoints')

describe('breakpoints', function() {

	it('should be an object', function() {

		assert.isObject(breakpoints)

	})

})
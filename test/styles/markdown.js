'use strict'

const assert = require('chai').assert
const markdown = require('../../src/styles/markdown')

describe('markdown', function() {

	it('should be a string', function() {

		assert.isString(markdown)

	})

})
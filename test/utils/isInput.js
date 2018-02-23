'use strict'

const assert = require('chai').assert
const isInput = require('../../src/utils/isInput')

describe('isInput()', function() {

	it('should return true for inputs', function() {

		const elem = {
			tagName: 'INPUT'
		}

		const result = isInput(elem)

		assert.isTrue(result)

	})

	it('should return true for textareas', function() {

		const elem = {
			tagName: 'TEXTAREA'
		}

		const result = isInput(elem)

		assert.isTrue(result)

	})

	it('should return false for divs', function() {

		const elem = {
			tagName: 'DIV'
		}

		const result = isInput(elem)

		assert.isFalse(result)

	})

})
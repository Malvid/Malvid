'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const filename = require('../../src/utils/filename')

describe('h()', function() {

	it('should return the filename', function() {

		const name = `${ uuid() }.njk`
		const src = `${ uuid() }/${ uuid() }/${ name }`

		const result = filename(src)

		assert.strictEqual(result, name)

	})

})
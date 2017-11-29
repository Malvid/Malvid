'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const normalizeURL = require('../../src/utils/normalizeURL')

describe('normalizeURL()', function() {

	it('should remove query and hash from URL', function() {

		const result = normalizeURL('http://localhost:3000/index.html?query=false#hash')

		assert.strictEqual(result, 'http://localhost:3000/index.html')

	})

	it('should append directory index when missing', function() {

		const result = normalizeURL('http://localhost:3000/')

		assert.strictEqual(result, 'http://localhost:3000/index.html')

	})

	it('should reuse the file name in the URL', function() {

		const url = `http://localhost:3000/${ uuid() }.html`
		const result = normalizeURL(url)

		assert.strictEqual(result, url)

	})

})
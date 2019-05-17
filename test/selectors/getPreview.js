'use strict'

const assert = require('chai').assert
const getPreview = require('../../src/selectors/getPreview')

describe('getPreview()', function() {

	it('should return true when config is missing', function() {

		const component = {
			data: []
		}

		const preview = getPreview(component)

		assert.strictEqual(preview, true)

	})

	it('should return true when config data is missing', function() {

		const component = {
			data: [
				{
					id: 'config'
				}
			]
		}

		const preview = getPreview(component)

		assert.strictEqual(preview, true)

	})

	it('should return true when preview is missing', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {}
				}
			]
		}

		const preview = getPreview(component)

		assert.strictEqual(preview, true)

	})

	it('should return true when preview is empty', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {
						preview: ''
					}
				}
			]
		}

		const preview = getPreview(component)

		assert.strictEqual(preview, true)

	})

	it('should return true', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {
						preview: true
					}
				}
			]
		}

		const preview = getPreview(component)

		assert.strictEqual(preview, true)

	})

	it('should return false', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {
						preview: false
					}
				}
			]
		}

		const preview = getPreview(component)

		assert.strictEqual(preview, false)

	})

})
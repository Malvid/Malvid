'use strict'

const assert = require('chai').assert
const getGroup = require('../../src/selectors/getGroup')

describe('getGroup()', function() {

	it('should return null when config is missing', function() {

		const component = {
			data: []
		}

		const group = getGroup(component)

		assert.strictEqual(group, null)

	})

	it('should return null when config data is missing', function() {

		const component = {
			data: [
				{
					id: 'config'
				}
			]
		}

		const group = getGroup(component)

		assert.strictEqual(group, null)

	})

	it('should return null when group is missing', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {}
				}
			]
		}

		const group = getGroup(component)

		assert.strictEqual(group, null)

	})

	it('should return null when group is empty', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {
						group: ''
					}
				}
			]
		}

		const group = getGroup(component)

		assert.strictEqual(group, null)

	})

	it('should return lowercase and trimmed group', function() {

		const component = {
			data: [
				{
					id: 'config',
					data: {
						group: ' Group '
					}
				}
			]
		}

		const group = getGroup(component)

		assert.strictEqual(group, component.data[0].data.group.toLowerCase().trim())

	})

})
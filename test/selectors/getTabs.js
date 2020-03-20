'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const getTabs = require('../../src/selectors/getTabs')

describe('getTabs()', function() {

	it('should return null when component is missing', function() {

		const tabs = getTabs()

		assert.strictEqual(tabs, null)

	})

	it('should return null when component data is missing', function() {

		const component = {}
		const tabs = getTabs(component)

		assert.strictEqual(tabs, null)

	})

	it('should return tabs without ignored config tab', function() {

		const tabId = uuid()

		const component = {
			data: [
				{
					id: tabId
				},
				{
					id: 'config'
				}
			]
		}

		const tabs = getTabs(component)

		assert.deepEqual(tabs, [
			component.data[0]
		])

	})

})
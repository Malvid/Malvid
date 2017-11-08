'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const getTab = require('../../src/selectors/getTab')

describe('getTab()', function() {

	it('should return null when component is missing', function() {

		const tab = getTab()

		assert.strictEqual(tab, null)

	})

	it('should return null when component data is missing', function() {

		const component = {}
		const tab = getTab(component)

		assert.strictEqual(tab, null)

	})

	it('should return tab', function() {

		const tabId = uuid()

		const component = {
			data: [
				{
					id: tabId
				}
			]
		}

		const tab = getTab(component, tabId)

		assert.deepEqual(tab, component.data[0])

	})

})
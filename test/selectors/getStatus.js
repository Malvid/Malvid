'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const getStatus = require('../../src/selectors/getStatus')

describe('getStatus()', function() {

	it('should return null when config is missing', function() {

		const statuses = {}

		const component = {
			data: []
		}

		const status = getStatus(statuses, component)

		assert.strictEqual(status, null)

	})

	it('should return null when config data is missing', function() {

		const statuses = {}

		const component = {
			data: [
				{
					id: 'config'
				}
			]
		}

		const status = getStatus(statuses, component)

		assert.strictEqual(status, null)

	})

	it('should return null when status is missing', function() {

		const statuses = {}

		const component = {
			data: [
				{
					id: 'config',
					data: {}
				}
			]
		}

		const status = getStatus(statuses, component)

		assert.strictEqual(status, null)

	})

	it('should return status', function() {

		const statusId = uuid()
		const statusValue = uuid()

		const statuses = {
			[statusId]: statusValue
		}

		const component = {
			data: [
				{
					id: 'config',
					data: {
						status: statusId
					}
				}
			]
		}

		const status = getStatus(statuses, component)

		assert.strictEqual(status, statusValue)

	})

})
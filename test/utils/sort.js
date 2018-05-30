'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const sort = require('../../src/utils/sort')

const passThrough = (_) => _
const name = (prefix) => prefix + uuid()

describe('sort()', function() {

	it('should return an empty array', function() {

		const components = []

		const result = sort(components, passThrough, passThrough)

		assert.isArray(result)
		assert.strictEqual(result.length, components.length)

	})

	it('should sort groups and components', function() {

		const groups = [
			name('a'),
			name('b')
		]

		const components = [
			{
				id: uuid(),
				name: name('b')
			},
			{
				id: uuid(),
				name: name('a')
			},
			{
				id: uuid(),
				name: name('1'),
				data: [
					{
						id: 'config',
						data: {
							group: groups[1]
						}
					}
				]
			},
			{
				id: uuid(),
				name: name('0'),
				data: [
					{
						id: 'config',
						data: {
							group: groups[1]
						}
					}
				]
			},
			{
				id: uuid(),
				name: name('c'),
				data: [
					{
						id: 'config',
						data: {
							group: groups[0]
						}
					}
				]
			}
		]

		const result = sort(components, passThrough, passThrough)

		assert.strictEqual(result[0].id, components[1].id)
		assert.strictEqual(result[1].id, components[0].id)
		assert.strictEqual(result[2], components[4].data[0].data.group)
		assert.strictEqual(result[3].id, components[4].id)
		assert.strictEqual(result[4], components[2].data[0].data.group)
		assert.strictEqual(result[5].id, components[3].id)
		assert.strictEqual(result[6].id, components[2].id)

	})

})
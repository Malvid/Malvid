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

	it('should sort groups', function() {

		const components = [
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'config',
						data: {
							group: name('b')
						}
					}
				]
			},
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'config',
						data: {
							group: name('a')
						}
					}
				]
			}
		]

		const result = sort(components, passThrough, passThrough)

		assert.strictEqual(result[0], components[1].data[0].data.group)
		assert.strictEqual(result[1].id, components[1].id)
		assert.strictEqual(result[2], components[0].data[0].data.group)
		assert.strictEqual(result[3].id, components[0].id)

	})

	it('should group and sort components by group', function() {

		const group = name('a')

		const components = [
			{
				id: uuid(),
				name: name('b'),
				data: [
					{
						id: 'config',
						data: {
							group
						}
					}
				]
			},
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'config',
						data: {
							group
						}
					}
				]
			}
		]

		const result = sort(components, passThrough, passThrough)

		assert.strictEqual(result[0], components[0].data[0].data.group)
		assert.strictEqual(result[1].id, components[1].id)
		assert.strictEqual(result[2].id, components[0].id)

	})

	it('should sort components', function() {

		const components = [
			{
				id: uuid(),
				name: name('b')
			},
			{
				id: uuid(),
				name: name('a')
			}
		]

		const result = sort(components, passThrough, passThrough)

		assert.strictEqual(result[0].id, components[1].id)
		assert.strictEqual(result[1].id, components[0].id)

	})

	it('should use initial order for components with the same name', function() {

		const name = uuid()

		const components = [
			{
				id: name,
				name
			},
			{
				id: name,
				name
			}
		]

		const result = sort(components, passThrough, passThrough)

		assert.strictEqual(result[0].id, components[0].id)
		assert.strictEqual(result[1].id, components[1].id)

	})

})
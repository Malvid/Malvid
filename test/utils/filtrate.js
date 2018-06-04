'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const filtrate = require('../../src/utils/filtrate')

const name = (prefix) => prefix + uuid()

describe('filtrate()', function() {

	it('should return components', function() {

		const components = [
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: name('b'),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const result = filtrate(components, '')

		assert.deepEqual(result, components)

	})

	it('should return components filtered by name', function() {

		const components = [
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: name('b'),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const result = filtrate(components, components[1].name)

		assert.deepEqual(result, [ components[1] ])

	})

	it('should return components filtered by data', function() {

		const components = [
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: name('b'),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const result = filtrate(components, `view:${ components[1].data[0].data }`)

		assert.deepEqual(result, [ components[1] ])

	})

	it('should ignore unknown tabs', function() {

		const components = [
			{
				id: uuid(),
				name: name('a')
			}
		]

		const result = filtrate(components, `view:${ components[0].name }`)

		assert.strictEqual(result.length, 0)

	})

	it('should ignore custom parsed tabs', function() {

		const components = [
			{
				id: uuid(),
				name: name('a'),
				data: [
					{
						id: 'view',
						data: {}
					}
				]
			}
		]

		const result = filtrate(components, `view:$${ components[0].name }`)

		assert.strictEqual(result.length, 0)

	})

})
'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const filtrate = require('../../src/utils/filtrate')

const name = (prefix) => prefix + uuid()

describe('filtrate', function() {

	describe('.links()', function() {

		it('should return links', function() {

			const links = [
				{
					label: uuid(),
					href: uuid()
				},
				{
					label: uuid(),
					href: uuid()
				}
			]

			const result = filtrate.links(links, '')

			assert.deepEqual(result, links)

		})

		it('should return links filtered by label', function() {

			const links = [
				{
					label: name('a'),
					href: uuid()
				},
				{
					label: name('b'),
					href: uuid()
				}
			]

			const result = filtrate.links(links, links[1].label)

			assert.deepEqual(result, [ links[1] ])

		})

		it('should fail silently with incorrect user input', function() {

			const result = filtrate.links([], `view:a"`)

			assert.strictEqual(result.length, 0)

		})

	})

	describe('.components()', function() {

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

			const result = filtrate.components(components, '')

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

			const result = filtrate.components(components, components[1].name)

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

			const result = filtrate.components(components, `view:${ components[1].data[0].data }`)

			assert.deepEqual(result, [ components[1] ])

		})

		it('should return components filtered by group', function() {

			const components = [
				{
					id: uuid(),
					name: name('a'),
					data: [
						{
							id: 'config',
							data: {
								group: uuid()
							}
						}
					]
				},
				{
					id: uuid(),
					name: name('b'),
					data: [
						{
							id: 'config',
							data: {
								group: uuid()
							}
						}
					]
				}
			]

			const result = filtrate.components(components, `group:${ components[1].data[0].data.group }`)

			assert.deepEqual(result, [ components[1] ])

		})

		it('should return components filtered by status', function() {

			const components = [
				{
					id: uuid(),
					name: name('a'),
					data: [
						{
							id: 'config',
							data: {
								status: uuid()
							}
						}
					]
				},
				{
					id: uuid(),
					name: name('b'),
					data: [
						{
							id: 'config',
							data: {
								status: uuid()
							}
						}
					]
				}
			]

			const result = filtrate.components(components, `status:${ components[1].data[0].data.status }`)

			assert.deepEqual(result, [ components[1] ])

		})

		it('should ignore unknown tabs', function() {

			const components = [
				{
					id: uuid(),
					name: name('a')
				}
			]

			const result = filtrate.components(components, `view:${ components[0].name }`)

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

			const result = filtrate.components(components, `view:${ components[0].name }`)

			assert.strictEqual(result.length, 0)

		})

		it('should fail silently with incorrect user input', function() {

			const result = filtrate.components([], `view:a"`)

			assert.strictEqual(result.length, 0)

		})

	})

})
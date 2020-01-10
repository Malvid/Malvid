'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const sort = require('../../src/utils/sort')

// Imitates the behaviour of the render function for links.
const passThroughLinks = (_) => _

// Imitates the behaviour of the render function for components.
// The function always returns an array to make handling the response easier.
const passThroughComponents = (_) => [ _ ]

describe('sort', function() {

	describe('.links()', function() {

		it('should return an empty array', function() {

			const links = []

			const result = sort.links(links, passThroughLinks)

			assert.isArray(result)
			assert.strictEqual(result.length, links.length)

		})

		it('should sort links', function() {

			const links = [
				{
					label: 'a-2',
					href: uuid()
				},
				{
					label: 'ä-10',
					href: uuid()
				},
				{
					label: 'b-1',
					href: uuid()
				},
				{
					label: 'a-1',
					href: uuid()
				}
			]

			const result = sort.links(links, passThroughLinks)

			assert.strictEqual(result[0].label, links[3].label)
			assert.strictEqual(result[1].label, links[0].label)
			assert.strictEqual(result[2].label, links[1].label)
			assert.strictEqual(result[3].label, links[2].label)

		})

		it('should use initial order for links with the same label', function() {

			const label = uuid()

			const links = [
				{
					label,
					href: uuid()
				},
				{
					label,
					href: uuid()
				}
			]

			const result = sort.links(links, passThroughLinks)

			assert.strictEqual(result[0].href, links[0].href)
			assert.strictEqual(result[1].href, links[1].href)

		})

	})

	describe('.components()', function() {

		it('should return an empty array', function() {

			const components = []

			const result = sort.components(components, passThroughComponents)

			assert.isArray(result)
			assert.strictEqual(result.length, components.length)

		})

		it('should sort groups', function() {

			const components = [
				{
					id: uuid(),
					name: 'a',
					data: [
						{
							id: 'config',
							data: {
								group: 'b'
							}
						}
					]
				},
				{
					id: uuid(),
					name: 'a',
					data: [
						{
							id: 'config',
							data: {
								group: 'a'
							}
						}
					]
				}
			]

			const result = sort.components(components, passThroughComponents)

			assert.strictEqual(result[0].group, components[1].data[0].data.group)
			assert.strictEqual(result[0].components[0].id, components[1].id)
			assert.strictEqual(result[1].group, components[0].data[0].data.group)
			assert.strictEqual(result[1].components[0].id, components[0].id)

		})

		it('should group and sort components by group', function() {

			const group = 'a'

			const components = [
				{
					id: uuid(),
					name: 'b',
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
					name: 'a',
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

			const result = sort.components(components, passThroughComponents)

			assert.strictEqual(result[0].group, components[0].data[0].data.group)
			assert.strictEqual(result[0].components[0].id, components[1].id)
			assert.strictEqual(result[0].components[1].id, components[0].id)

		})

		it('should sort components', function() {

			const components = [
				{
					id: uuid(),
					name: 'a-2'
				},
				{
					id: uuid(),
					name: 'ä-10'
				},
				{
					id: uuid(),
					name: 'b-1'
				},
				{
					id: uuid(),
					name: 'a-1'
				}
			]

			const result = sort.components(components, passThroughComponents)

			assert.strictEqual(result[0].components[0].id, components[3].id)
			assert.strictEqual(result[0].components[1].id, components[0].id)
			assert.strictEqual(result[0].components[2].id, components[1].id)
			assert.strictEqual(result[0].components[3].id, components[2].id)

		})

		it('should use initial order for components with the same name', function() {

			const name = uuid()

			const components = [
				{
					id: uuid(),
					name
				},
				{
					id: uuid(),
					name
				}
			]

			const result = sort.components(components, passThroughComponents)

			assert.strictEqual(result[0].components[0].id, components[0].id)
			assert.strictEqual(result[0].components[1].id, components[1].id)

		})

	})

})
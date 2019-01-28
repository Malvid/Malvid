'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const createNavigation = require('../../src/utils/createNavigation')

const name = (prefix) => prefix + uuid()

describe('createNavigation()', function() {

	it('should return object', function() {

		const result = createNavigation([], '')

		assert.isObject(result)

	})

	it('should return first component in group', function() {

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
				name: name('b'),
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

		const result = createNavigation(components, '').firstComponent()

		assert.deepEqual(result, components[1])

	})

	it('should return first component', function() {

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

		const result = createNavigation(components, '').firstComponent()

		assert.deepEqual(result, components[0])

	})

	it('should return previous component', function() {

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

		const result = createNavigation(components, '', components[1]).prevComponent()

		assert.deepEqual(result, components[0])

	})

	it('should return next component', function() {

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

		const result = createNavigation(components, '', components[0]).nextComponent()

		assert.deepEqual(result, components[1])

	})

	it('should return first component of filtered components', function() {

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

		const result = createNavigation(components, components[1].name, components[0]).firstComponent()

		assert.deepEqual(result, components[1])

	})

	it('should return undefined when first component is not available', function() {

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
			}
		]

		const result = createNavigation(components, uuid(), components[0]).firstComponent()

		assert.isUndefined(result)

	})

	it('should return undefined when previous or next component is not available', function() {

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
			}
		]

		const prevComponent = createNavigation(components, '', components[0]).prevComponent()
		const nextComponent = createNavigation(components, '', components[0]).nextComponent()

		assert.isUndefined(prevComponent)
		assert.isUndefined(nextComponent)

	})

})
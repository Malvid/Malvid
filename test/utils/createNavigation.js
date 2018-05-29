'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const createNavigation = require('../../src/utils/createNavigation')

describe('createNavigation()', function() {

	it('should return object', function() {

		const result = createNavigation([], '')

		assert.isObject(result)

	})

	it('should return first component', function() {

		const components = [
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const component = createNavigation(components, '').firstComponent()

		assert.deepEqual(component, components[0])

	})

	it('should return previous component', function() {

		const components = [
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const component = createNavigation(components, '', components[1]).prevComponent()

		assert.deepEqual(component, components[0])

	})

	it('should return next component', function() {

		const components = [
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const component = createNavigation(components, '', components[0]).nextComponent()

		assert.deepEqual(component, components[1])

	})

	it('should return first component of filtered components', function() {

		const components = [
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			},
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const component = createNavigation(components, components[1].name, components[0]).firstComponent()

		assert.deepEqual(component, components[1])

	})

	it('should return undefined when first component is not available', function() {

		const components = [
			{
				id: uuid(),
				name: uuid(),
				data: [
					{
						id: 'view',
						data: uuid()
					}
				]
			}
		]

		const component = createNavigation(components, uuid(), components[0]).firstComponent()

		assert.isUndefined(component)

	})

	it('should return undefined when previous or next component is not available', function() {

		const components = [
			{
				id: uuid(),
				name: uuid(),
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
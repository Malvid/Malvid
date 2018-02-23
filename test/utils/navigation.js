'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const navigation = require('../../src/utils/navigation')

describe('navigation()', function() {

	it('should return object', function() {

		const state = {
			filter: '',
			route: {
				componentId: uuid(),
				tabId: uuid()
			},
			components: []
		}

		const store = {
			getState: () => state
		}

		const result = navigation(store)

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

		const state = {
			filter: '',
			route: {
				componentId: components[1].id,
				tabId: uuid()
			},
			components
		}

		const store = {
			getState: () => state
		}

		const component = navigation(store).firstComponent()

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

		const state = {
			filter: '',
			route: {
				componentId: components[1].id,
				tabId: uuid()
			},
			components
		}

		const store = {
			getState: () => state
		}

		const component = navigation(store).prevComponent()

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

		const state = {
			filter: '',
			route: {
				componentId: components[0].id,
				tabId: uuid()
			},
			components
		}

		const store = {
			getState: () => state
		}

		const component = navigation(store).nextComponent()

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

		const state = {
			filter: components[1].name,
			route: {
				componentId: components[0].id,
				tabId: uuid()
			},
			components
		}

		const store = {
			getState: () => state
		}

		const component = navigation(store).firstComponent()

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

		const state = {
			filter: uuid(),
			route: {
				componentId: components[0].id,
				tabId: uuid()
			},
			components
		}

		const store = {
			getState: () => state
		}

		const component = navigation(store).firstComponent()

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

		const state = {
			filter: '',
			route: {
				componentId: components[0].id,
				tabId: uuid()
			},
			components
		}

		const store = {
			getState: () => state
		}

		const prevComponent = navigation(store).prevComponent()
		const nextComponent = navigation(store).nextComponent()

		assert.isUndefined(prevComponent)
		assert.isUndefined(nextComponent)

	})

})
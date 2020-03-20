'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const getComponent = require('../../src/selectors/getComponent')

describe('getComponent()', function() {

	it('should return undefined when component is missing', function() {

		const componentId = uuid()

		const components = [
			{
				id: uuid()
			}
		]

		const component = getComponent(components, componentId)

		assert.strictEqual(component, undefined)

	})

	it('should return component', function() {

		const componentId = uuid()

		const components = [
			{
				id: componentId
			},
			{
				id: uuid()
			}
		]

		const component = getComponent(components, componentId)

		assert.deepEqual(component, components[0])

	})

})
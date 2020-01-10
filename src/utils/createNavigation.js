'use strict'

const filtrate = require('./filtrate')
const sort = require('./sort')

module.exports = (components, filter, currentComponent) => {

	// Just use the components and ignore the group
	const render = ({ components }) => components

	// Components and groups filtered and sorted
	const items = sort.components(
		filtrate.components(components, filter),
		render
	)

	const nearCurrentComponent = (offset) => {

		const currentComponentIndex = items.findIndex(({ id }) => id === currentComponent.id)

		return items[currentComponentIndex + offset]

	}

	return {
		firstComponent: () => items[0],
		prevComponent: () => nearCurrentComponent(-1),
		nextComponent: () => nearCurrentComponent(1)
	}

}
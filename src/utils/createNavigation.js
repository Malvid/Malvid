'use strict'

const filtrate = require('./filtrate')
const sort = require('./sort')

module.exports = (components, filter, currentComponent) => {

	// Components and groups filtered and sorted
	const items = sort(
		filtrate(components, filter),
		() => undefined,
		(component) => component
	)

	// All components without groups
	const filteredItems = items.filter((item) => item != null)

	const nearCurrentComponent = (offset) => {

		const currentComponentIndex = filteredItems.findIndex(({ id }) => id === currentComponent.id)

		return filteredItems[currentComponentIndex + offset]

	}

	return {
		firstComponent: () => filteredItems[0],
		prevComponent: () => nearCurrentComponent(-1),
		nextComponent: () => nearCurrentComponent(1)
	}

}
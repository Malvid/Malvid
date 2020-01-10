'use strict'

const getGroup = require('../selectors/getGroup')

const sortByProp = (prop) => (a, b) => {

	const _a = a[prop]
	const _b = b[prop]

	return _a.localeCompare(_b, 'en', { numeric: true })

}

const links = (links, render) => {

	const sortedByName = [ ...links ].sort(sortByProp('label'))

	const rendered = sortedByName.map((item) => render(item))

	return rendered

}

const components = (components, render) => {

	const grouped = components.reduce((acc, component) => {

		// Use an empty string for ungrouped components. The empty string won't
		// collide with the groups of the user as it's not possible to use empty groups.
		const group = getGroup(component) || ''

		const index = acc.findIndex((item) => item.group === group)
		const hasGroup = index !== -1

		if (hasGroup === true) acc[index].components.push(component)

		if (hasGroup === false) acc.push({
			group,
			components: [
				component
			]
		})

		return acc

	}, [])

	const sortedByName = grouped.map(({ group, components }) => ({
		group,
		components: [ ...components ].sort(sortByProp('name'))
	}))

	const sortedByNameAndGroup = [ ...sortedByName ].sort(sortByProp('group'))

	// The render function always returns an array no matter if it's one group or
	// multiple components. This makes handling the response easier.
	const rendered = sortedByNameAndGroup.reduce((acc, item) => [
		...acc,
		...render(item)
	], [])

	const cleaned = rendered.filter((item) => item != null)

	return cleaned

}

module.exports = {
	links,
	components
}
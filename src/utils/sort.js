'use strict'

const getGroup = require('../selectors/getGroup')

const sortByProp = (prop) => (a, b) => {

	const _a = a[prop]
	const _b = b[prop]

	return _a.localeCompare(_b, 'en', { numeric: true })

}

module.exports = (components, render) => {

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
		components: components.sort(sortByProp('name'))
	}))

	const sortedByNameAndGroup = sortedByName.sort(sortByProp('group'))

	const rendered = sortedByNameAndGroup.reduce((acc, item) => [
		...acc,
		...render(item)
	], [])

	const cleaned = rendered.filter((item) => item != null)

	return cleaned

}
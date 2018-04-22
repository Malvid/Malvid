'use strict'

const getGroup = require('../selectors/getGroup')

module.exports = (components, toNavGroup, toNavItem) => {

	const ungrouped = components.reduce((acc, component) => {

		const group = getGroup(component)
		const hasGroup = group != null

		if (hasGroup === true) return acc

		return [
			...acc,
			component
		]

	}, [])

	const grouped = components.reduce((acc, component) => {

		const group = getGroup(component)
		const hasGroup = group != null

		if (hasGroup === false) return acc

		acc[group] = [
			...(acc[group] || []),
			component
		]

		return acc

	}, {})

	return [
		...ungrouped.map(toNavItem),
		...Object.keys(grouped).reduce((acc, group) => [
			...acc,
			toNavGroup(group),
			...grouped[group].map(toNavItem)
		], [])
	]

}
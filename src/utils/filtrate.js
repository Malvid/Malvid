'use strict'

const searchstring = require('searchstring')

const getTab = require('../selectors/getTab')
const getGroup = require('../selectors/getGroup')
const getStatus = require('../selectors/getStatus')

const clean = (value) => String(value).trim().toLowerCase()

const hasProp = (value) => value.prop != null
const hasNoProp = (value) => value.prop == null

const parse = (filter) => {

	try {
		return searchstring(filter)
	} catch (err) {
		console.error('Failed to parse `filter`', err)
		return []
	}

}

module.exports = (components, filter) => {

	const conditions = parse(filter)

	const terms = conditions.filter(hasNoProp)
	const props = conditions.filter(hasProp)

	const term = clean(terms.map((condition) => condition.value).join(' '))

	const hasTerm = term !== ''
	const hasProps = Object.keys(props).length !== 0

	return components.filter((component) => {

		const name = component.name

		const inName = name.includes(term)

		const inTabs = props.every((condition) => {

			const value = clean(condition.value)
			const tab = getTab(component, condition.prop)

			// Look for special filters when the prop is not a tab
			if (tab == null) {

				const group = getGroup(component)
				const status = getStatus(component)

				const hasGroup = group != null
				const hasStatus = status != null

				if (condition.prop === 'group' && hasGroup === true) return group.includes(value)
				if (condition.prop === 'status' && hasStatus === true) return status.includes(value)

				return false

			}

			// Data might be parsed by a user-defined function.
			// In this case it's not a searchable string.
			if (typeof tab.data !== 'string') return false

			return tab.data.includes(value)

		})

		return (
			(hasTerm === true ? inName === true : true) &&
			(hasProps === true ? inTabs === true : true)
		)

	})

}
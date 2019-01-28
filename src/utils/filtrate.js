'use strict'

const searchstring = require('searchstring')

const getTab = require('../selectors/getTab')

const hasProp = (value) => value.prop != null
const hasNoProp = (value) => value.prop == null

module.exports = (components, filter) => {

	const conditions = searchstring(filter)

	const terms = conditions.filter(hasNoProp)
	const props = conditions.filter(hasProp)

	const term = terms.map((condition) => condition.value).join(' ').toLowerCase()

	const hasTerm = term !== ''
	const hasProps = Object.keys(props).length !== 0

	return components.filter((component) => {

		const name = component.name

		const inName = name.includes(term)

		const inTabs = props.some((condition) => {

			const value = condition.value.toLowerCase()
			const tab = getTab(component, condition.prop)

			if (tab == null) return false

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
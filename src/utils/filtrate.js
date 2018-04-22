'use strict'

const searchstring = require('searchstring')

const getTab = require('../selectors/getTab')

module.exports = (components, filter) => {

	const s = searchstring(filter)

	const term = s.terms.join(' ').toLowerCase()
	const props = s.props

	const hasTerm = term !== ''
	const hasProps = Object.keys(props).length !== 0

	return components.filter((component) => {

		const name = component.name

		const inName = name.includes(term)

		const inTabs = Object.keys(props).some((prop) => {

			const value = props[prop].toLowerCase()
			const tab = getTab(component, prop)

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
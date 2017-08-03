'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const filtrate = require('../utils/filtrate')
const sort = require('../utils/sort')
const getStatus = require('../selectors/getStatus')
const { NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')

const NavGroup = require('./NavGroup')
const NavItem = require('./NavItem')
const Filter = require('./Filter')

const style = {

	self: css({
		padding: '1em 0 1em 1em',
		minWidth: NAV_MIN_WIDTH,
		width: `calc(${ NAV_WIDTH } - var(--size-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ CONTENT_MIN_WIDTH })`,
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	})

}

module.exports = ({ statuses, components, currentComponent, currentTab, filter, setFilter }) => {

	const toNavGroup = (group) => (
		h(NavGroup, {
			key: group,
			label: group
		})
	)

	const toNavItem = (component) => (
		h(NavItem, {
			key: component.id,
			id: component.id,
			label: component.name,
			status: getStatus(statuses, component),
			active: component.id===currentComponent.id,
			currentTab
		})
	)

	const items = sort(
		filtrate(components, filter),
		toNavGroup,
		toNavItem
	)

	items.unshift(h(Filter, { key: 'asdasd', filter, setFilter }))

	return (
		h('nav', { className: style.self.toString() },
			items
		)
	)

}

module.exports.propTypes = {

	statuses: propTypes.object.isRequired,
	components: propTypes.array.isRequired,
	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired,
	filter: propTypes.string.isRequired,
	setFilter: propTypes.func.isRequired

}
'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const createRoute = require('../utils/createRoute')
const filtrate = require('../utils/filtrate')
const sort = require('../utils/sort')
const getStatus = require('../selectors/getStatus')
const { BORDER_RADIUS, NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')
const { MOBILE_MENU } = require('../constants/breakpoints')

const NavGroup = require('./NavGroup')
const NavItem = require('./NavItem')
const Filter = require('./Filter')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		flexDirection: 'column',
		minWidth: NAV_MIN_WIDTH,
		width: `calc(${ NAV_WIDTH } - var(--size-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ CONTENT_MIN_WIDTH })`,
		[MOBILE_MENU]: {
			display: 'none'
		}
	}),

	filter: css({
		flexShrink: '0',
		padding: '1em 0 0 1em',
		marginBottom: `-${ BORDER_RADIUS }`
	}),

	items: css({
		flexGrow: '1',
		padding: `calc(${ BORDER_RADIUS } + .5em) 0 1em 1em`,
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
			label: component.name,
			status: getStatus(statuses, component),
			active: component.id === currentComponent.id,
			href: createRoute(component.id, currentTab.id)
		})
	)

	const items = sort(
		filtrate(components, filter),
		toNavGroup,
		toNavItem
	)

	return (
		h('nav', { className: style.self.toString() },
			h('div', { className: style.filter.toString() },
				h(Filter, { filter, setFilter })
			),
			h('div', { className: style.items.toString() }, items)
		)
	)

}

module.exports.displayName = 'Nav'

module.exports.propTypes = {

	statuses: propTypes.object.isRequired,
	components: propTypes.array.isRequired,
	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired,
	filter: propTypes.string.isRequired,
	setFilter: propTypes.func.isRequired

}
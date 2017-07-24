'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const sort = require('../utils/sort')
const getStatus = require('../selectors/getStatus')
const { NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')

const NavGroup = require('./NavGroup')
const NavItem = require('./NavItem')

const style = {

	self: css({
		display: 'flex',
		flexDirection: 'column',
		minWidth: NAV_MIN_WIDTH,
		width: `calc(${ NAV_WIDTH } - var(--currentSize-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ CONTENT_MIN_WIDTH })`
	}),

	scroller: css({
		flexGrow: '1',
		padding: '1em 0 1em 1em',
		height: '100%',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	})

}

module.exports = ({ statuses, components, currentComponent, currentTab }) => {

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

	const items = sort(components, toNavGroup, toNavItem)

	return (
		h('nav', { className: style.self.toString() },
			h('div', { className: style.scroller.toString() },
				items
			)
		)
	)

}

module.exports.propTypes = {

	statuses: propTypes.object.isRequired,
	components: propTypes.array.isRequired,
	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired

}
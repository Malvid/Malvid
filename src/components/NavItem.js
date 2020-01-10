'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const navItem = require('../styles/navItem')
const { BLUE_LIGHT } = require('../constants/colors')

const NavStatus = require('./NavStatus')

const style = {

	self: css(navItem),

	active: css({
		background: BLUE_LIGHT
	}),

	label: css({
		textOverflow: 'ellipsis',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	})

}

const NavItem = (props) => {

	return (
		h('a', {
			className: css(style.self, props.active && style.active).toString(),
			href: props.href
		},
			h('span', { className: style.label.toString() }, props.label),
			props.status != null && h(NavStatus, props.status)
		)
	)

}

NavItem.displayName = 'NavItem'

NavItem.propTypes = {

	label: propTypes.string.isRequired,
	status: propTypes.object,
	active: propTypes.bool.isRequired,
	href: propTypes.string.isRequired

}

module.exports = NavItem
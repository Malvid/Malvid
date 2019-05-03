'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { BLUE_LIGHT, MID } = require('../constants/colors')

const NavStatus = require('./NavStatus')

const style = {

	self: css({
		'display': 'flex',
		'alignItems': 'center',
		'marginBottom': '1px',
		'padding': '.8em 1.2em',
		'width': '100%',
		'color': 'currentColor',
		'textDecoration': 'none',
		'borderRadius': BORDER_RADIUS,
		'outline': 'none',
		'cursor': 'default',
		':active': {
			background: MID
		}
	}),

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

module.exports = (props) => {

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

module.exports.displayName = 'NavItem'

module.exports.propTypes = {

	label: propTypes.string.isRequired,
	status: propTypes.object,
	active: propTypes.bool.isRequired,
	href: propTypes.string.isRequired

}
'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { MID } = require('../constants/colors')

const NavIcon = require('./NavIcon')
const IconLink = require('./IconLink')

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

	label: css({
		textOverflow: 'ellipsis',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	})

}

const NavLink = (props) => {

	return (
		h('a', {
			className: style.self.toString(),
			href: props.href,
			target: '_blank'
		},
			h('span', { className: style.label.toString() }, props.label),
			h(NavIcon, {},
				h(IconLink)
			)
		)
	)

}

NavLink.displayName = 'NavLink'

NavLink.propTypes = {

	label: propTypes.string.isRequired,
	href: propTypes.string.isRequired

}

module.exports = NavLink
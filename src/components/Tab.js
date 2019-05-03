'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { HEIGHT } = require('../constants/sizes')
const { BLUE, WHITE, MID } = require('../constants/colors')

const style = {

	self: css({
		flexGrow: '1',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 .95em',
		width: '100%',
		height: HEIGHT,
		background: WHITE,
		color: 'currentColor',
		textOverflow: 'ellipsis',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		outline: 'none',
		cursor: 'default',
		transition: 'box-shadow .3s ease',
		boxShadow: `inset 0 -1px 0 ${ MID }`
	}),

	active: css({
		boxShadow: `inset 0 -2px 0 ${ BLUE }`
	})

}

module.exports = (props) => {

	return (
		h('a', {
			className: css(style.self, props.active && style.active).toString(),
			href: props.href
		}, props.label)
	)

}

module.exports.displayName = 'Tab'

module.exports.propTypes = {

	label: propTypes.string.isRequired,
	active: propTypes.bool.isRequired,
	href: propTypes.string.isRequired

}
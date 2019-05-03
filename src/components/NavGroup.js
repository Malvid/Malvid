'use strict'

const { Fragment } = require('react')
const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')

const style = {

	self: css({
		'padding': `.9em ${ BORDER_RADIUS }`,
		'width': '100%',
		'background': 'transparent',
		'appearance': 'none',
		'border': 'none',
		'outline': 'none',
		'color': 'inherit',
		'textAlign': 'left',
		'font': 'inherit',
		'fontSize': '.7em',
		'fontWeight': 'bold',
		'textTransform': 'uppercase',
		'textOverflow': 'ellipsis',
		'whiteSpace': 'nowrap',
		'overflow': 'hidden',
		'cursor': 'default',
		':first-child': {
			paddingTop: '0'
		}
	})

}

module.exports = (props) => {

	return (
		h(Fragment, {},
			h('button', {
				className: style.self.toString(),
				onClick: props.onClick
			}, props.label),
			props.children
		)
	)

}

module.exports.displayName = 'NavGroup'

module.exports.propTypes = {

	label: propTypes.string.isRequired,
	onClick: propTypes.func.isRequired,
	children: propTypes.arrayOf(propTypes.node).isRequired

}
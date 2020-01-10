'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

const style = {

	self: css({
		flexShrink: '0',
		marginLeft: '.5em',
		width: '18px',
		height: '18px'
	})

}

const NavIcon = (props) => {

	return (
		h('div', {
			title: props.description,
			className: style.self.toString()
		},
			props.children
		)
	)

}

NavIcon.displayName = 'NavIcon'

NavIcon.propTypes = {

	description: propTypes.string.isRequired,
	children: propTypes.arrayOf(propTypes.node).isRequired

}

module.exports = NavIcon
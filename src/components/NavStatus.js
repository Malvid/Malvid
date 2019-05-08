'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

const style = {

	self: ({ color }) => css({
		flexShrink: '0',
		marginLeft: '.5em',
		width: '11px',
		height: '11px',
		borderRadius: '100%',
		border: `2px solid ${ color }`
	})

}

const NavStatus = (props) => {

	return (
		h('div', {
			title: props.description,
			className: style.self({ color: props.color }).toString()
		})
	)

}

NavStatus.displayName = 'NavStatus'

NavStatus.propTypes = {

	description: propTypes.string.isRequired,
	color: propTypes.string.isRequired

}

module.exports = NavStatus
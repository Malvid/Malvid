'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

const IconSad = require('./IconSad')

const style = {

	self: ({ color }) => css({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		color: color,
		width: '100%',
		height: '100vh'
	}),

	icon: css({
		marginBottom: '.75em',
		width: '4em',
		height: '4em'
	}),

	text: css({
		margin: '0'
	})

}

module.exports = ({ color, text }) => (

	h('div', { className: style.self({ color }).toString() },
		h('div', { className: style.icon.toString() },
			h(IconSad)
		),
		h('p', { className: style.text.toString() }, text)
	)

)

module.exports.displayName = 'Empty'

module.exports.propTypes = {

	color: propTypes.string.isRequired,
	text: propTypes.string.isRequired

}
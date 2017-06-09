'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

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
		marginBottom: '.1em',
		color: 'currentColor',
		fontSize: '5em'
	}),

	text: css({
		margin: '0',
		color: 'currentColor'
	})

}

module.exports = ({ color, text }) => (

	h('div', { className: style.self({ color }).toString() },
		h('div', { className: `ion ion-android-sad ${ style.icon.toString() }` }),
		h('p', { className: style.text.toString() }, text)
	)

)

module.exports.propTypes = {

	color: propTypes.string.isRequired,
	text: propTypes.string.isRequired

}
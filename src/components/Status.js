'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS_INNER } = require('../constants/sizes')
const { WHITE } = require('../constants/colors')

const style = {

	self: ({ color }) => css({
		padding: '.3em .8em',
		background: color,
		color: WHITE,
		fontSize: '.8em',
		fontWeight: 'bold',
		borderRadius: BORDER_RADIUS_INNER
	})

}

const Status = (props) => {

	return (
		h('div', {
			title: props.description,
			className: style.self({ color: props.color }).toString()
		}, props.label)
	)

}

Status.displayName = 'Status'

Status.propTypes = {

	label: propTypes.string.isRequired,
	description: propTypes.string.isRequired,
	color: propTypes.string.isRequired

}

module.exports = Status
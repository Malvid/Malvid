'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { DARK } = require('../constants/colors')

const style = {

	self: css({
		marginBottom: '.1em',
		padding: '.9em 1.2em',
		width: '100%',
		appearance: 'none',
		background: 'transparent',
		border: 'none',
		color: DARK,
		textAlign: 'left',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		borderRadius: BORDER_RADIUS,
		outline: 'none',
		':active': {
			background: 'rgba(0, 0, 0, .08)'
		}
	}),

	active: css({
		background: 'rgba(0, 0, 0, .08)'
	})

}

module.exports = ({ id, label, active, setCurrentComponent }) => (

	h('button', {
		className: css(style.self, active && style.active).toString(),
		onClick: setCurrentComponent.bind(null, id)
	}, label)

)
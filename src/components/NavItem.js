'use strict'

const { h } = require('preact')
const { css } = require('glamor')

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
		borderRadius: '6px',
		transition: 'background 0s .05s',
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
		class: css(style.self, active && style.active).toString(),
		onClick: setCurrentComponent.bind(null, id)
	}, label)

)
'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const { DARK } = require('../styles/colors')

const style = {

	self: css({
		padding: '.9em 1.2em',
		width: '100%',
		appearance: 'none',
		background: 'rgba(0, 0, 0, 0)',
		border: 'none',
		color: DARK,
		textAlign: 'left',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		borderRadius: '6px',
		':hover': {
			background: 'rgba(0, 0, 0, .05)'
		},
		':active': {
			background: 'rgba(0, 0, 0, .1)'
		}
	})

}

module.exports = ({ id, label, active, setCurrentComponent }) => (

	h('button', {
		class: style.self.toString(),
		onClick: setCurrentComponent.bind(null, id)
	}, label)

)
'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const { BLUE, MID, DARK } = require('../styles/colors')

const style = {

	self: css({
		flex: '1 1 auto',
		padding: '1.1em',
		width: '100%',
		appearance: 'none',
		background: 'transparent',
		color: DARK,
		textAlign: 'center',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		border: 'none',
		transition: 'box-shadow .3s ease',
		boxShadow: `inset 0 -1px 0 ${ MID }, inset -1px 0 0 ${ MID }`,
		':last-child': {
			boxShadow: `inset 0 -1px 0 ${ MID }`
		}
	}),

	active: css({
		boxShadow: `inset 0 -2px 0 ${ BLUE }, inset -1px 0 0 ${ MID }`,
		':last-child': {
			boxShadow: `inset 0 -2px 0 ${ BLUE }`
		}
	})

}

module.exports = ({ id, label, active, setCurrentTab }) => (

	h('button', {
		class: css(style.self, active && style.active).toString(),
		onClick: setCurrentTab.bind(null, id)
	}, label)

)
'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const { BLUE, MID, DARK } = require('../constants/colors')

const Status = require('./Status')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 1.2em',
		borderBottom: `1px solid ${ MID }`
	}),

	label: css({
		margin: '0',
		padding: '.85em .4em',
		color: DARK,
		fontSize: '1em',
		fontWeight: 'normal'
	}),

	tools: css({
		display: 'flex',
		alignItems: 'center'
	}),

	separator: css({
		width: '1em'
	}),

	button: css({
		padding: '.85em .4em',
		background: 'transparent',
		appearance: 'none',
		border: 'none',
		color: DARK,
		fontSize: '1.2em',
		textDecoration: 'none',
		outline: 'none',
		cursor: 'default',
		':active': {
			color: BLUE
		}
	})

}

module.exports = ({ status, label, url }) => (

	h('div', { className: style.self.toString() },
		h('h1', { className: style.label.toString() },
			label
		),
		h('div', { className: style.tools.toString() },
			h('a', {
				className: `${ style.button.toString() } ion ion-android-exit`,
				title: 'Open in new tab',
				href: url,
				target: '_blank'
			}),
			status!=null && h('div', { className: style.separator.toString() }),
			status!=null && h(Status, status)
		)
	)

)
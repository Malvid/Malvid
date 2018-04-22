'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const selectable = require('../styles/selectable')
const { HEIGHT } = require('../constants/sizes')
const { BLUE, MID } = require('../constants/colors')

const Status = require('./Status')
const IconTab = require('./IconTab')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 1.2em',
		height: HEIGHT,
		borderBottom: `1px solid ${ MID }`
	}),

	label: css(selectable, {
		margin: '0',
		padding: '.4em',
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
		padding: '.4em',
		width: '1.8em',
		height: '1.8em',
		background: 'transparent',
		appearance: 'none',
		border: 'none',
		color: 'currentcolor',
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
				className: style.button.toString(),
				title: 'Open in new tab',
				href: url,
				target: '_blank'
			},
				h(IconTab)
			),
			status != null && h('div', { className: style.separator.toString() }),
			status != null && h(Status, status)
		)
	)

)

module.exports.propTypes = {

	status: propTypes.object,
	label: propTypes.string.isRequired,
	url: propTypes.string.isRequired

}
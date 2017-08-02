'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { BLUE_LIGHT } = require('../constants/colors')

const NavStatus = require('./NavStatus')

const style = {

	self: css({
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1px',
		padding: '.8em 1.2em',
		width: '100%',
		color: 'currentcolor',
		textDecoration: 'none',
		borderRadius: BORDER_RADIUS,
		outline: 'none',
		':active': {
			background: BLUE_LIGHT
		}
	}),

	active: css({
		background: BLUE_LIGHT
	}),

	label: css({
		textOverflow: 'ellipsis',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	})

}

module.exports = ({ id, label, status, active, currentTab }) => (

	h('a', {
		className: css(style.self, active && style.active).toString(),
		href: `#/${ id }/${ currentTab.id }`
	},
		h('span', { className: style.label.toString() }, label),
		status!=null && h(NavStatus, status)
	)

)

module.exports.propTypes = {

	id: propTypes.string.isRequired,
	label: propTypes.string.isRequired,
	status: propTypes.object,
	active: propTypes.bool.isRequired,
	currentTab: propTypes.object.isRequired

}
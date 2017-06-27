'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { DARK } = require('../constants/colors')

const NavStatus = require('./NavStatus')

const style = {

	self: css({
		display: 'flex',
		alignItems: 'center',
		marginBottom: '.1em',
		padding: '.9em 1.2em',
		width: '100%',
		color: DARK,
		textAlign: 'left',
		textOverflow: 'ellipsis',
		textDecoration: 'none',
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

module.exports = ({ id, label, status, active, currentTab }) => (

	h('a', {
		className: css(style.self, active && style.active).toString(),
		href: `#/${ id }/${ currentTab.id }`
	},
		label,
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
'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BLUE, MID, DARK } = require('../constants/colors')

const style = {

	self: css({
		flexGrow: '1',
		padding: '1.1em',
		width: '100%',
		color: DARK,
		textAlign: 'center',
		textOverflow: 'ellipsis',
		textDecoration: 'none',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		outline: 'none',
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

module.exports = ({ id, label, active, currentComponent }) => (

	h('a', {
		className: css(style.self, active && style.active).toString(),
		href: `#/${ currentComponent.id }/${ id }`
	}, label)

)

module.exports.propTypes = {

	id: propTypes.string.isRequired,
	label: propTypes.string.isRequired,
	active: propTypes.bool.isRequired,
	currentComponent: propTypes.object.isRequired

}
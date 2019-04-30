'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')

const style = {

	self: css({
		'padding': `.9em ${ BORDER_RADIUS }`,
		'width': '100%',
		'fontSize': '.7em',
		'fontWeight': 'bold',
		'textTransform': 'uppercase',
		'textOverflow': 'ellipsis',
		'whiteSpace': 'nowrap',
		'overflow': 'hidden',
		':first-child': {
			paddingTop: '0'
		}
	})

}

module.exports = ({ label }) => (

	h('div', { className: style.self.toString() },
		label
	)

)

module.exports.displayName = 'NavGroup'

module.exports.propTypes = {

	label: propTypes.string.isRequired

}
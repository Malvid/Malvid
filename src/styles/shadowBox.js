'use strict'

const { BORDER_RADIUS } = require('../constants/sizes')
const { WHITE } = require('../constants/colors')

module.exports = {
	flexGrow: '1',
	width: '100%',
	background: WHITE,
	boxShadow: '0 1px 3px rgba(0, 0, 0, .10)',
	borderRadius: BORDER_RADIUS,
	overflow: 'hidden'
}
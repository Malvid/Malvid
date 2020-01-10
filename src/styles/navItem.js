'use strict'

const { BORDER_RADIUS } = require('../constants/sizes')
const { MID } = require('../constants/colors')

module.exports = {
	'display': 'flex',
	'alignItems': 'center',
	'marginBottom': '1px',
	'padding': '.8em 1.2em',
	'width': '100%',
	'color': 'currentColor',
	'textDecoration': 'none',
	'borderRadius': BORDER_RADIUS,
	'outline': 'none',
	'cursor': 'default',
	':active': {
		background: MID
	}
}
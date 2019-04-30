'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const { MOBILE_MENU } = require('../constants/breakpoints')

const Preview = require('./Preview')
const Resizer = require('./Resizer')
const Inspector = require('./Inspector')

const style = {

	self: css({
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 1em 1em 0',
		minWidth: '0',
		[MOBILE_MENU]: {
			padding: '1em'
		}
	})

}

module.exports = (props) => (

	h('div', { className: style.self.toString() },
		h(Preview, props),
		h(Resizer, {
			direction: 'vertical',
			setSize: props.setSizeVertical,
			setSizeStatus: props.setSizeStatus
		}),
		h(Inspector, props)
	)

)

module.exports.displayName = 'Content'
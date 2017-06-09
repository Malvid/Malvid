'use strict'

const { css } = require('glamor')

const h = require('../utils/h')

const style = {

	self: css({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	}),

	icon: css({
		marginBottom: '.1em',
		fontSize: '5em'
	}),

	text: css({
		margin: '0'
	})

}

module.exports = () => (

	h('div', { className: style.self.toString() },
		h('div', { className: `ion ion-android-sad ${ style.icon.toString() }` }),
		h('p', { className: style.text.toString() }, 'No components found')
	)

)
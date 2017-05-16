'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const style = {

	self: css({
		flex: '1 1 auto',
		position: 'relative',
		padding: '.5em 1em 1em .5em',
		display: 'flex'
	}),

	shadowBox: css(shadowBox)

}

module.exports = (props) => (
	h('section', { class: style.self.toString() },
		h('div', { class: style.shadowBox.toString() })
	)
)
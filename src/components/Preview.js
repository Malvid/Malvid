'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const style = {

	self: css({
		flex: '0 0 auto',
		display: 'flex',
		height: 'calc(50vh - var(--currentSize-vertical, 0))'
	}),

	iframe: css(shadowBox, {
		padding: '.5em'
	})

}

module.exports = ({ src }) => (

	h('section', { class: style.self.toString() },
		h('iframe', {
			class: style.iframe.toString(),
			src
		})
	)

)
'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const style = {

	self: ({ currentSize }) => css({
		flex: '0 0 auto',
		display: 'flex',
		height: `calc(50vh - ${ currentSize.vertical }px)`
	}),

	iframe: css(shadowBox, {
		padding: '.5em',
		'pointer-events':'none'
	})

}

module.exports = ({ src, currentSize }) => (

	h('section', { class: style.self({ currentSize }).toString() },
		h('iframe', {
			class: style.iframe.toString(),
			src
		})
	)

)
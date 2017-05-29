'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')

const style = {

	self: css({
		display: 'flex',
		minHeight: PREVIEW_MIN_HEIGHT,
		height: `calc(${ PREVIEW_HEIGHT } - var(--currentSize-vertical, 0))`,
		maxHeight: `calc(100vh - ${ INSPECTOR_MIN_HEIGHT })`
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
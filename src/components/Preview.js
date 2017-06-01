'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')
const { CURRENT_SIZE_STATUS_ACTIVE } = require('../constants/currentSize')

const style = {

	self: css({
		display: 'flex',
		minHeight: PREVIEW_MIN_HEIGHT,
		height: `calc(${ PREVIEW_HEIGHT } - var(--currentSize-vertical, 0))`,
		maxHeight: `calc(100vh - ${ INSPECTOR_MIN_HEIGHT })`
	}),

	iframe: ({ currentSizeStatus }) => css(shadowBox, {
		padding: '.5em',
		pointerEvents: currentSizeStatus===CURRENT_SIZE_STATUS_ACTIVE && 'none'
	})

}

module.exports = ({ currentComponent, currentSizeStatus, setComponentData }) => (

	h('section', { class: style.self.toString() },
		h('iframe', {
			class: style.iframe({ currentSizeStatus }).toString(),
			onload: (e) => setComponentData(currentComponent.id, 'output', e.target.contentDocument.body.outerHTML),
			src: currentComponent.url
		})
	)

)
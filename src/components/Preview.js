'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const shadowBox = require('../styles/shadowBox')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')
const { CURRENT_SIZE_STATUS_ACTIVE } = require('../constants/currentSize')

const Toolbar = require('./Toolbar')

const style = {

	self: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column',
		minHeight: PREVIEW_MIN_HEIGHT,
		height: `calc(${ PREVIEW_HEIGHT } - var(--currentSize-vertical, 0))`,
		maxHeight: `calc(100vh - ${ INSPECTOR_MIN_HEIGHT })`
	}),

	iframe: ({ currentSizeStatus }) => css({
		flexGrow: '1',
		padding: '.5em',
		minHeight: '0',
		border: 'none',
		pointerEvents: currentSizeStatus===CURRENT_SIZE_STATUS_ACTIVE && 'none'
	})

}

module.exports = ({ currentComponent, currentSizeStatus, setComponentData }) => (

	h('section', { className: style.self.toString() },
		h(Toolbar, {
			label: currentComponent.name,
			url: currentComponent.url
		}),
		h('iframe', {
			className: style.iframe({ currentSizeStatus }).toString(),
			onLoad: (e) => setComponentData(currentComponent.id, 'output', e.target.contentDocument.body.outerHTML),
			src: currentComponent.url
		})
	)

)
'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const shadowBox = require('../styles/shadowBox')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')

const Toolbar = require('./Toolbar')
const Frame = require('./Frame')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		minHeight: PREVIEW_MIN_HEIGHT,
		height: `calc(${ PREVIEW_HEIGHT } - var(--size-vertical, 0px))`,
		maxHeight: `calc(100vh - ${ INSPECTOR_MIN_HEIGHT })`
	}),

	shadowBox: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column'
	})

}

const Preview = (props) => {

	return (
		h('div', { className: style.self.toString() },
			h('div', { className: style.shadowBox.toString() },
				h(Toolbar, {
					statuses: props.opts.statuses,
					components: props.components,
					currentComponent: props.currentComponent,
					currentTab: props.currentTab
				}),
				h(Frame, {
					currentComponent: props.currentComponent,
					hydrate: props.hydrate
				})
			)
		)
	)

}

Preview.displayName = 'Preview'

module.exports = Preview
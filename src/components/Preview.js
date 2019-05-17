'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const shadowBox = require('../styles/shadowBox')
const getPreview = require('../selectors/getPreview')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')
const { MID } = require('../constants/colors')

const Toolbar = require('./Toolbar')
const Frame = require('./Frame')

const style = {

	self: ({hasPreview}) => css({
		flexShrink: '0',
		display: 'flex',
		minHeight: hasPreview === true ? PREVIEW_MIN_HEIGHT : '0',
		height: hasPreview === true ? `calc(${ PREVIEW_HEIGHT } - var(--size-vertical, 0px))` : 'auto',
		maxHeight: `calc(100vh - ${ INSPECTOR_MIN_HEIGHT })`
	}),

	shadowBox: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column'
	}),

	seperator: css({
		height: '1px',
		width: '100%',
		background: MID
	})

}

const Preview = (props) => {

	const hasPreview = getPreview(props.currentComponent)

	return (
		h('div', { className: style.self({ hasPreview }).toString() },
			h('div', { className: style.shadowBox.toString() },
				h(Toolbar, {
					statuses: props.opts.statuses,
					components: props.components,
					currentComponent: props.currentComponent,
					currentTab: props.currentTab
				}),
				hasPreview === true && h('div', { className: style.seperator.toString() }),
				hasPreview === true && h(Frame, {
					currentComponent: props.currentComponent,
					hydrate: props.hydrate
				})
			)
		)
	)

}

Preview.displayName = 'Preview'

module.exports = Preview
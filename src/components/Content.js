'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const { NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')

const Preview = require('./Preview')
const Resizer = require('./Resizer')
const Inspector = require('./Inspector')

const style = {

	self: css({
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 1em 1em 0',
		minWidth: CONTENT_MIN_WIDTH,
		width: `calc(100% - ${ NAV_WIDTH } + var(--currentSize-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ NAV_MIN_WIDTH })`
	})

}

module.exports = (props) => {

	if (props.currentComponent==null) return null

	return (
		h('content', { className: style.self.toString() },
			h(Preview, {
				currentComponent: props.currentComponent,
				currentSizeStatus: props.currentSize.status,
				setComponentData: props.setComponentData
			}),
			h(Resizer, {
				direction: 'vertical',
				setCurrentSize: props.setCurrentSizeVertical,
				setCurrentSizeStatus: props.setCurrentSizeStatus
			}),
			h(Inspector, {
				files: props.opts.files,
				currentComponent: props.currentComponent,
				currentTab: props.currentTab,
				setCurrentTab: props.setCurrentTab
			})
		)
	)

}
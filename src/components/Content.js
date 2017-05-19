'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const Preview = require('./Preview')
const Resizer = require('./Resizer')
const Inspector = require('./Inspector')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 1em 1em 0',
		width: 'calc(100% - 300px + var(--currentSize-horizontal, 0px))'
	})

}

module.exports = (props) => {

	if (props.currentComponent==null) return null

	return (
		h('content', { class: style.self.toString() },
			h(Preview, {
				src: props.currentComponent.url
			}),
			h(Resizer, {
				direction: 'vertical',
				setCurrentSize: props.setCurrentSizeVertical
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
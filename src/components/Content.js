'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const Preview = require('./Preview')
const Resizer = require('./Resizer')
const Inspector = require('./Inspector')

const style = {

	self: ({ currentSize }) => css({
		flex: '0 0 auto',
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 1em 1em 0',
		width: `calc(100% - 300px + ${ currentSize.horizontal }px)`
	})

}

module.exports = (props) => {

	if (props.currentComponent==null) return null

	return (
		h('content', { class: style.self(props).toString() },
			h(Preview, {
				src: props.currentComponent.url,
				currentSize: props.currentSize
			}),
			h(Resizer, {
				direction: 'vertical',
				setCurrentSize: props.setCurrentSizeVertical
			}),
			h(Inspector, {
				files: props.opts.files,
				currentComponent: props.currentComponent,
				currentSize: props.currentSize,
				currentTab: props.currentTab,
				setCurrentTab: props.setCurrentTab
			})
		)
	)

}
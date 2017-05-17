'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const Tabs = require('./Tabs')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		padding: '.5em 1em 1em .5em',
	}),

	shadowBox: css(shadowBox)

}

module.exports = (props) => {

	if (props.currentTab==null) return null

	console.log(props.currentTab)

	return (
		h('section', { class: style.self.toString() },
			h('div', { class: style.shadowBox.toString() },
				h(Tabs, {
					data: props.currentComponent.data,
					currentTab: props.currentTab,
					setCurrentTab: props.setCurrentTab
				}),
				h('div', null,
					props.currentComponent.data[props.currentTab]
				)
			)
		)
	)

}
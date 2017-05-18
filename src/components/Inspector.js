'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const Tabs = require('./Tabs')
const Code = require('./Code')
const Markdown = require('./Markdown')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		padding: '.5em 1em 1em .5em'
	}),

	shadowBox: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column'
	})

}

module.exports = (props) => {

	if (props.currentTab==null) return null

	const languages = props.opts.files[props.currentTab].languages
	const data = props.currentComponent.data[props.currentTab]

	const Viewer = languages[0]==='markdown' ? Markdown : Code

	return (
		h('section', { class: style.self.toString() },
			h('div', { class: style.shadowBox.toString() },
				h(Tabs, {
					data: props.currentComponent.data,
					currentTab: props.currentTab,
					setCurrentTab: props.setCurrentTab
				}),
				h(Viewer, {
					languages,
					data
				})
			)
		)
	)

}
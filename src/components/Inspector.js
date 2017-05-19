'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const Tabs = require('./Tabs')
const Code = require('./Code')
const Markdown = require('./Markdown')

const style = {

	self: ({ currentSize }) => css({
		flex: '1 1 auto',
		display: 'flex'
	}),

	shadowBox: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column'
	})

}

module.exports = ({ files, currentComponent, currentSize, currentTab, setCurrentTab }) => {

	const languages = files[currentTab].languages
	const data = currentComponent.data[currentTab]

	const Viewer = languages[0]==='markdown' ? Markdown : Code

	return (
		h('section', { class: style.self({ currentSize }).toString() },
			h('div', { class: style.shadowBox.toString() },
				h(Tabs, {
					data: currentComponent.data,
					currentTab,
					setCurrentTab
				}),
				h(Viewer, {
					languages,
					data
				})
			)
		)
	)

}
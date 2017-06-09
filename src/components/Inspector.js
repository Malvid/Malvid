'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const getTabs = require('../selectors/getTabs')
const shadowBox = require('../styles/shadowBox')
const { PREVIEW_MIN_HEIGHT, PREVIEW_HEIGHT, INSPECTOR_MIN_HEIGHT } = require('../constants/sizes')

const Tabs = require('./Tabs')
const Code = require('./Code')
const Markdown = require('./Markdown')

const style = {

	self: css({
		display: 'flex',
		minHeight: INSPECTOR_MIN_HEIGHT,
		height: `calc(100vh - ${ PREVIEW_HEIGHT } + var(--currentSize-vertical, 0px))`,
		maxHeight: `calc(100vh - ${ PREVIEW_MIN_HEIGHT })`
	}),

	shadowBox: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column'
	})

}

module.exports = ({ files, currentComponent, currentTab, setCurrentTab }) => {

	const languages = files[currentTab].languages
	const data = getTabs(currentComponent)[currentTab]

	const Viewer = languages[0]==='markdown' ? Markdown : Code

	return (
		h('section', { className: style.self.toString() },
			h('div', { className: style.shadowBox.toString() },
				h(Tabs, {
					currentComponent,
					currentTab,
					setCurrentTab
				}),
				h(Viewer, {
					languages,
					data: data || ''
				})
			)
		)
	)

}
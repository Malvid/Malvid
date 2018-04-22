'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const shadowBox = require('../styles/shadowBox')

const Tabs = require('./Tabs')
const Code = require('./Code')
const Markdown = require('./Markdown')
const Empty = require('./Empty')

const style = {

	self: css({
		flexGrow: '1',
		display: 'flex',
		minHeight: '0'
	}),

	shadowBox: css(shadowBox, {
		display: 'flex',
		flexDirection: 'column'
	})

}

module.exports = ({ currentComponent, currentTab }) => {

	const { data, languages } = currentTab

	const Viewer = languages[0] === 'markdown' ? Markdown : Code

	return (
		h('div', { className: style.self.toString() },
			h('div', { className: style.shadowBox.toString() },
				h(Tabs, {
					currentComponent,
					currentTab
				}),
				data != null && h(Viewer, {
					languages,
					data
				}),
				data == null && h(Empty, {
					color: '#bbb',
					text: 'No data found'
				})
			)
		)
	)

}

module.exports.propTypes = {

	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired

}
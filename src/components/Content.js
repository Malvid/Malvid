'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const Preview = require('./Preview')
const Tabs = require('./Tabs')

const style = {

	self: css({
		flex: '1 1 auto',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column'
	})

}

module.exports = (props) => (
	h('content', { class: style.self.toString() },
		h(Preview, props),
		h(Tabs, props)
	)
)
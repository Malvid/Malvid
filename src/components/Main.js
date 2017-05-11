'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const Nav = require('./Nav')
const Content = require('./Content')

const style = {

	self: css({
		display: 'flex',
		width: '100%'
	})

}

module.exports = (props) => (
	h('div', { class: style.self.toString() },
		h(Nav, props),
		h(Content, props)
	)
)
'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const style = {

	self: css({
		flex: '1 1 auto',
		position: 'relative',
		background: 'rgba(0, 0, 0, .3)'
	})

}

module.exports = (props) => (
	h('section', { class: style.self.toString() })
)
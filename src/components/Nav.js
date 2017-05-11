'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const style = {

	self: css({
		flex: '0 0 auto',
		position: 'relative',
		minWidth: '10vw',
		width: '300px',
		maxWidth: '90vw',
		background: 'rgba(0, 0, 0, .1)'
	})

}

module.exports = (props) => (
	h('nav', { class: style.self.toString() })
)
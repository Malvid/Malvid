'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const style = {

	self: css({
		flex: '0 0 auto',
		position: 'relative',
		minHeight: '10vh',
		height: '50vh',
		maxHeight: '90vh',
		background: 'rgba(0, 0, 0, .2)'
	})

}

module.exports = (props) => (
	h('section', { class: style.self.toString() })
)
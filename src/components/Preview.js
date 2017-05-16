'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const shadowBox = require('../styles/shadowBox.js')

const style = {

	self: css({
		flex: '0 0 auto',
		position: 'relative',
		display: 'flex',
		padding: '1em 1em .5em .5em',
		minHeight: '10vh',
		height: '50vh',
		maxHeight: '90vh'
	}),

	shadowBox: css(shadowBox)

}

module.exports = (props) => (
	h('section', { class: style.self.toString() },
		h('iframe', { class: style.shadowBox.toString() })
	)
)
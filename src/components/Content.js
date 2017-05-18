'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const Preview = require('./Preview')
const Inspector = require('./Inspector')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column'
	})

}

module.exports = (props) => (

	h('content', { class: style.self.toString() },
		h(Preview, { src: (props.currentComponent || {}).url }),
		h(Inspector, props)
	)

)
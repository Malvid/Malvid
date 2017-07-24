'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

const style = {

	self: css({
		display: 'none',
		position: 'absolute',
		top: '0',
		right: '0',
		bottom: '0',
		left: '0'
	}),

	visible: css({
		display: 'block'
	})

}

module.exports = ({ visible }) => (

	h('div', { className: css(style.self, visible && style.visible).toString() })

)

module.exports.propTypes = {

	visible: propTypes.bool.isRequired

}
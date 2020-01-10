'use strict'

const { css } = require('glamor')

const h = require('../utils/h')

const style = {

	self: css({
		height: '1px',
		background: `linear-gradient(to left, rgba(255, 255, 255, 0), rgba(140, 140, 140, .3), rgba(140, 140, 140, .3), rgba(255, 255, 255, 0))`
	})

}

const NavSeparator = () => {

	return (
		h('div', {
			className: style.self.toString()
		})
	)

}

NavSeparator.displayName = 'NavSeparator'

module.exports = NavSeparator
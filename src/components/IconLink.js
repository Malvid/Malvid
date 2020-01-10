'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const icon = require('../styles/icon')

const style = {

	self: css(icon)

}

const IconLink = () => {

	return (
		h('svg', {
			className: style.self.toString(),
			viewBox: '0 0 512 512'
		},
			h('path', { d: 'M74.6 256c0-38.3 31.1-69.4 69.4-69.4h88V144h-88c-61.8 0-112 50.2-112 112s50.2 112 112 112h88v-42.6h-88c-38.3 0-69.4-31.1-69.4-69.4zm85.4 22h192v-44H160v44zm208-134h-88v42.6h88c38.3 0 69.4 31.1 69.4 69.4s-31.1 69.4-69.4 69.4h-88V368h88c61.8 0 112-50.2 112-112s-50.2-112-112-112z' })
		)
	)

}

IconLink.displayName = 'IconLink'

module.exports = IconLink
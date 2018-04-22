'use strict'

const isClient = require('./isClient')
const eventPos = require('./eventPos')

module.exports = (() => {

	if (isClient === false) return null

	let pos = {}

	document.addEventListener('mousemove', (e) => pos = eventPos(e), false)
	document.addEventListener('mouseenter', (e) => pos = eventPos(e), false)

	return () => pos

})()
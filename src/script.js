'use strict'

const path = require('path')
const handler = require('rosid-handler-js')

module.exports = (() => {

	const filePath = path.resolve(__dirname, './client.js')
	const babel = { babelrc: false }
	const opts = { optimize: false, babel }

	return handler(filePath, opts)

})()
'use strict'

const path = require('path')
const handler = require('rosid-handler-js')

module.exports = (() => {

	const filePath = path.resolve(__dirname, './client.js')

	const browserify = {}
	const babel = { babelrc: false, compact: false }
	const opts = { optimize: false, browserify, babel }

	return handler(filePath, opts)

})()
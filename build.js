'use strict'

const { writeFile } = require('fs')
const { promisify } = require('util')
const js = require('rosid-handler-js')
const save = promisify(writeFile)

js('src/client.js', {

	optimize: true,
	babel: { babelrc: false, compact: false }

}).then((data) => {

	return save('dist/client.min.js', data)

})
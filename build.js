'use strict'

const { writeFile } = require('fs').promises
const js = require('rosid-handler-js')

js('src/client.js', {

	optimize: true,
	babel: { babelrc: false, compact: false }

}).then((data) => {

	return writeFile('dist/client.min.js', data)

})
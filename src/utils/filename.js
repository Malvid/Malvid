'use strict'

const filenameRegex = require('filename-regex')()

module.exports = (src) => src.match(filenameRegex)[0]
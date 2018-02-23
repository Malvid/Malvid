'use strict'

const tags = [
	'input',
	'textarea'
]

module.exports = (elem) => tags.includes(elem.tagName.toLowerCase())
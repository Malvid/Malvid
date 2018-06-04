'use strict'

const escapeStringRegexp = require('escape-string-regexp')

const filename = require('../utils/filename')

module.exports = (data, components, render) => {

	// The longer the filename the higher the uniqueness of the string
	const ordered = components.sort((a, b) => {

		const lengthA = filename(a.src).length
		const lengthB = filename(b.src).length

		if (lengthA < lengthB) return 1
		if (lengthA > lengthB) return -1

		return 0

	})

	ordered.forEach((component) => {

		const rawFilename = filename(component.src)

		// Special characters shouldn't be interpreted as regular expressions
		const escapedFilename = escapeStringRegexp(rawFilename)
		const regex = new RegExp(escapedFilename, 'g')

		// Some components may end with the same filename. We use invisible characters
		// to make them only match once during the replacement. We clould also use a negative
		// lookbehind and lookahead, but this feature is only supported by upcoming browsers.
		const safeFilename = rawFilename.split('').join('&zwnj;')

		const link = render(component, safeFilename)

		data = data.replace(regex, link)

	})

	return data

}
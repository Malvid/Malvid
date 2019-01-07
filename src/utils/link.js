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

		// Some components may end with the same filename. We wrap a span around every character
		// to make them only match once during the replacement. The span isn't visible and won't
		// be copied when a user selects code.
		const safeFilename = [ ...rawFilename ].map((char) => `<span>${ char }</span>`).join('')

		const link = render(component, safeFilename)

		data = data.replace(regex, link)

	})

	return data

}
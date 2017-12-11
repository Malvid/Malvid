'use strict'

const normalizeURL = require('./normalizeURL')

module.exports = async function(url) {

	const endpoint = `${ normalizeURL(url) }.json`
	const request = new Request(endpoint, { credentials: 'same-origin' })
	const response = await fetch(request)

	if (response.ok===false) throw new Error('Failed to request components data')

	// Must await promise otherwise the catch can't catch the error
	try { return await response.json() }
	catch (err) { throw new Error('Failed to parse components data') }

}

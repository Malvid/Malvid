'use strict'

const normalizeURL = require('./normalizeURL')

module.exports = async function(url) {

	let nextState

	const endpoint = `${ normalizeURL(url) }.json`
	const response = await fetch(endpoint)

	if (response.ok===false) throw new Error('Failed to request components data')

	try { nextState = await response.json() }
	catch (err) { throw new Error('Failed to parse components data') }

	return nextState

}
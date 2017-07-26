'use strict'

const normalizeUrl = require('normalize-url')

module.exports = (url) => {

	url = normalizeUrl(url, {
		stripWWW: false,
		removeDirectoryIndex: true,
		removeQueryParameters: [ /^/i ]
	})

	// Add directory index when url contains no file
	return url.substr(-5)==='.href' ? url : `${ url }/index.html`

}
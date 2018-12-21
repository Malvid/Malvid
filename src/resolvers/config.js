const requireData = require('require-data')
const continuousStealthyRequire = require('continuous-stealthy-require')

module.exports = {
	id: 'config',
	label: 'Config',
	languages: [ 'json' ],
	parse: async (contents, filePath) => {

		// Allow empty JSON files
		if ((await contents).trim() === '') return {}

		// Require uncached JS or JSON
		return requireData(filePath, continuousStealthyRequire)

	},
	resolve: (fileName) => [ `${ fileName }.config.json`, `${ fileName }.config.js` ]
}
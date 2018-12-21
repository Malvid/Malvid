const requireData = require('require-data')
const continuousStealthyRequire = require('continuous-stealthy-require')

module.exports = {
	id: 'data',
	label: 'Data',
	languages: [ 'json', 'js' ],
	parse: async (contents, filePath) => {

		// Allow empty JSON files
		if ((await contents).trim() === '') return '{}'

		// Require uncached JS or JSON file and stringify it
		return JSON.stringify(requireData(filePath, continuousStealthyRequire), null, 2)

	},
	resolve: (fileName) => [ `${ fileName }.data.json`, `${ fileName }.data.js` ]
}
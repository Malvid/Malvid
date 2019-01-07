const requireData = require('require-data')
const continuousStealthyRequire = require('continuous-stealthy-require')

module.exports = {
	id: 'data',
	label: 'Data',
	languages: [ 'json', 'js' ],
	parse: async (contents, filePath) => {

		// Allow empty JSON files
		if ((await contents).trim() === '') return '{}'

		// Require uncached JS or JSON
		const data = await requireData(filePath, continuousStealthyRequire)

		// Stringify it with a custom indentation to make it look good
		return JSON.stringify(data, null, 2)

	},
	resolve: (filename) => [ `${ filename }.data.json`, `${ filename }.data.js` ]
}
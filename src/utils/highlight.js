const highlight = require('highlight.js/lib/highlight')

const languages = [
	'php',
	'python',
	'css',
	'coffeescript',
	'reasonml',
	'xml',
	'json',
	'javascript',
	'markdown',
	'django',
	'elm',
	'htmlbars',
	'haml',
	'handlebars',
	'less',
	'scss',
	'stylus',
	'twig',
	'typescript',
	'yaml',
	'plaintext'
]

languages.forEach((language) => {
	highlight.registerLanguage(language, require(`highlight.js/lib/languages/${ language }`))
})

module.exports = highlight
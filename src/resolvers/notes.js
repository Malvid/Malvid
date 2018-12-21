module.exports = {
	id: 'notes',
	label: 'Notes',
	languages: [ 'markdown' ],
	resolve: (fileName) => [ `${ fileName }.md` ]
}
module.exports = {
	id: 'notes',
	label: 'Notes',
	languages: [ 'markdown' ],
	resolve: (filename) => [ `${ filename }.md` ]
}
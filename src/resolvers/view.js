module.exports = {
	id: 'view',
	label: 'View',
	languages: [ 'twig' ],
	resolve: (filename, fileExt) => [ `${ filename }${ fileExt }` ]
}
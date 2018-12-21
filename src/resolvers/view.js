module.exports = {
	id: 'view',
	label: 'View',
	languages: [ 'twig' ],
	resolve: (fileName, fileExt) => [ `${ fileName }${ fileExt }` ]
}
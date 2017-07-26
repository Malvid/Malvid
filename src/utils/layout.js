'use strict'

module.exports = (body, js, opts) => `
	<!doctype html>
	<html lang="${ opts.lang }">
		<head>

			<title>${ opts.title }</title>

			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="description" content="${ opts.description }">

			<!-- CSS -->
			<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css">
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/atom-one-light.min.css">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">

		</head>
		<body>

			${ body }

			<!-- JS -->
			<script>${ js }</script>

		</body>
	</html>
`
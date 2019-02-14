'use strict'

module.exports = (body, js, opts) => `
	<!doctype html>
	<html lang="${ opts.lang }">
		<head>

			<title>${ opts.title }</title>

			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="description" content="${ opts.description }">

		</head>
		<body>

			${ body }

			<!-- JS -->
			<script>${ js }</script>

			<!-- Custom CSS -->
			<style>${ opts.style }</style>

			<!-- Custom JS -->
			<script>${ opts.script }</script>

		</body>
	</html>
`
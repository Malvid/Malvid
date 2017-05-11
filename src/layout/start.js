'use strict'

module.exports = (props, css, ids) => `
	<!doctype html>
	<html lang="${ props.lang }">
		<head>

			<title>${ props.title }</title>

			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<meta name="description" content="${ props.description }">

			<!-- CSS -->
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css">
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">

			<!-- Glamor CSS -->
			<style>${ css }</style>

			<!-- Rehydration -->
			<script>
				window._state = {
					props: ${ JSON.stringify(props) },
					glamor: ${ JSON.stringify(ids) }
				}
			</script>

		</head>
		<body>
`
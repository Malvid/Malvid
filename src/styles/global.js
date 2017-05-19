'use strict'

const { LIGHT, DARK } = require('./colors')

module.exports = `
	html {
		width: 100%;
		height: 100%;
		font: normal 400 100%/1.6 'Open Sans', sans-serif;
		color: ${ DARK };
	}

	@media (max-width: 900px) {
		html {
			font-size: 87.5%;
		}
	}

	body {
		display: flex;
		height: 100%;
		background: ${ LIGHT };
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body *,
	body *::before,
	body *::after {
		box-sizing: border-box;
	}
`
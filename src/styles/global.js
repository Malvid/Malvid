'use strict'

const { LIGHT, DARK } = require('../constants/colors')

module.exports = `
	html {
		width: 100%;
		height: 100%;
		color: ${ DARK };
		font: normal 400 100%/1.6 system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
		overflow: hidden;
	}

	@media (max-width: 800px) {
		html {
			font-size: 87.5%;
		}
	}

	body {
		height: 100%;
		width: 100%;
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

	#main {
		display: flex;
		width: 100%;
		height: 100%;
	}
`
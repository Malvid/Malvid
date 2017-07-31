'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const layout = require('../../src/utils/layout')

describe('layout', function() {

	it('should include a custom body', function() {

		const body = `<div id="main">${ uuid() }</div>`

		const result = layout(body, '', {})

		assert.include(result, body)

	})

	it('should include a custom script', function() {

		const js = uuid()

		const result = layout('', js, {})

		assert.include(result, `<script>${ js }</script>`)

	})

	it('should include custom head', function() {

		const opts = {
			lang: uuid(),
			title: uuid(),
			description: uuid()
		}

		const result = layout('', '', opts)

		assert.include(result, `<html lang="${ opts.lang }">`)
		assert.include(result, `<title>${ opts.title }</title>`)
		assert.include(result, `<meta name="description" content="${ opts.description }">`)

	})

})
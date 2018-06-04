'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const link = require('../../src/utils/link')
const filename = require('../../src/utils/filename')

describe('link()', function() {

	it('should work with an empty data string', function() {

		const html = ''
		const components = []
		const render = () => ''

		const result = link(html, components, render)

		assert.strictEqual(result, html)

	})

	it('should replace names with links', function() {

		const srcs = [
			`${ uuid() }/${ uuid() }/_${ uuid() }.njk`,
			`${ uuid() }/${ uuid() }.njk`,
			`${ uuid() }.njk`
		]

		// A name that includes a name of another component
		srcs.push(uuid() +	srcs[2])

		// Unknown component that should not be replaced
		srcs.push(`${ uuid() }.njk`)

		const html = `
			<span>${ srcs[0] }</span>
			{% inject "${ srcs[1] }" %}
			${ srcs[2] }
			${ srcs[3] }
			${ srcs[4] }
		`

		const components = [
			{
				id: uuid(),
				src: srcs[0]
			},
			{
				id: uuid(),
				src: srcs[1]
			},
			{
				id: uuid(),
				src: srcs[2]
			},
			{
				id: uuid(),
				src: srcs[3]
			},
			{
				// Component that is not used in the HTML
				id: uuid(),
				src: srcs[3]
			}
		]

		const render = ({ id }) => id

		const expected = `
			<span>${ srcs[0].replace(filename(srcs[0]), '') + render(components[0]) }</span>
			{% inject "${ srcs[1].replace(filename(srcs[1]), '') + render(components[1]) }" %}
			${ render(components[2]) }
			${ render(components[3]) }
			${ srcs[4] }
		`

		const result = link(html, components, render)

		assert.strictEqual(result, expected)

	})

})
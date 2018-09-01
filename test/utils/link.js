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

		const components = [
			{
				// Component with a long path
				id: uuid(),
				src: `${ uuid() }/${ uuid() }/_${ uuid() }.njk`
			},
			{
				// Component with a path
				id: uuid(),
				src: `${ uuid() }/${ uuid() }.njk`
			},
			{
				// Component without a filename only
				id: uuid(),
				src: `${ uuid() }.njk`
			}
		]

		// Component with a name that includes the name of another component
		components.push({
			id: uuid(),
			src: uuid() + components[2].src
		})

		// Unused component
		components.push({
			id: uuid(),
			src: `${ uuid() }.njk`
		})

		const html = `
			<span>${ components[0].src }</span>
			{% inject "${ components[1].src }" %}
			${ components[2].src }
			${ components[3].src }
		`

		// The real renderer gets a safe filename from the link function
		const realRender = (component, filename) => filename

		// The fake renderer needs to escape the filename like the link function does
		const fakeRender = (filename) => [ ...filename ].map((char) => `<span>${ char }</span>`).join('')

		// Removes the filename from a path
		const pathWithoutFilename = (src) => src.replace(filename(src), '')

		const expected = `
			<span>${ pathWithoutFilename(components[0].src) + fakeRender(filename(components[0].src)) }</span>
			{% inject "${ pathWithoutFilename(components[1].src) + fakeRender(filename(components[1].src)) }" %}
			${ fakeRender(filename(components[2].src)) }
			${ fakeRender(filename(components[3].src)) }
		`

		const result = link(html, components, realRender)

		assert.strictEqual(result, expected)

	})

})
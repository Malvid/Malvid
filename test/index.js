'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('../src/index')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('index()', function() {

	it('should return an error when called with invalid options', async function() {

		return index('').then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(err.message, `'opts' must be an object, null or undefined`)

		})

	})

	it('should render HTML with a head and react placeholder', async function() {

		this.timeout(50000)

		const opts = {
			lang: uuid(),
			title: uuid(),
			description: uuid()
		}

		const result = await index(opts)
		const html = await result.html

		assert.isString(html)
		assert.include(html, `<html lang="${ opts.lang }">`)
		assert.include(html, `<title>${ opts.title }</title>`)
		assert.include(html, `<meta name="description" content="${ opts.description }">`)
		assert.include(html, `<div id="main"></div>`)

	})

	it('should render JSON without components', async function() {

		this.timeout(50000)

		const structure = await fsify([
			{
				type: fsify.DIRECTORY,
				name: uuid(),
				contents: []
			}
		])

		const opts = {
			src: structure[0].name
		}

		const result = await index(opts)
		const json = await result.json

		assert.isObject(json)
		assert.strictEqual(json.components.length, 0)

	})

	it('should render JSON with a component', async function() {

		this.timeout(50000)

		const componentName = uuid()

		const structure = await fsify([
			{
				type: fsify.DIRECTORY,
				name: uuid(),
				contents: [
					{
						type: fsify.FILE,
						name: `${ componentName }.njk`,
						contents: 'Hello World!'
					},
					{
						type: fsify.FILE,
						name: `${ componentName }.data.json`,
						contents: JSON.stringify({})
					},
					{
						type: fsify.FILE,
						name: `${ componentName }.config.json`,
						contents: JSON.stringify({})
					},
					{
						type: fsify.FILE,
						name: `${ componentName }.md`,
						contents: '# Hello World'
					}
				]
			}
		])

		const opts = {
			src: structure[0].name
		}

		const result = await index(opts)
		const json = await result.json

		assert.isObject(json)
		assert.strictEqual(json.components.length, 1)
		assert.strictEqual(json.components[0].name, componentName)

	})

})
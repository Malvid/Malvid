'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('../src/index')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('index()', function() {

	it('should return an error when called without a filePath', async function() {

		return index().then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'filePath' must be a string`, err.message)

		})

	})

	it('should return an error when called with invalid options', async function() {

		return index(null, '').then((result) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'opts' must be an object, null or undefined`, err.message)

		})

	})

	it('should render a page with siteData', async function() {

		this.timeout(20000)

		const opts = {
			lang: uuid(),
			title: uuid(),
			description: uuid()
		}

		const result = await index(null, opts)

		assert.include(result, `<html lang="${ opts.lang }">`)
		assert.include(result, `<title>${ opts.title }</title>`)
		assert.include(result, `<meta name="description" content="${ opts.description }">`)

	})

	it('should render a page without components', async function() {

		this.timeout(20000)

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

		const result = await index(null, opts)

		assert.include(result, 'No components found')

	})

	it('should render a page with components', async function() {

		this.timeout(20000)

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
						name: `${ componentName }.md`,
						contents: '# Hello World'
					}
				]
			}
		])

		const opts = {
			src: structure[0].name
		}

		const result = await index(null, opts)

		assert.include(result, componentName)

	})

})
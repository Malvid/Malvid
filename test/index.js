'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('./../src/index')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('index()', function() {

	it('should return an error when called with invalid options', function() {

		return index(null, '').then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'opts' must be an object, null or undefined`, err.message)

		})

	})

	it('should render a page with siteData', function() {

		this.timeout(10000)

		const opts = {
			lang: uuid(),
			title: uuid(),
			description: uuid()
		}

		return index(null, opts).then((data) => {

			assert.include(data, `<html lang="${ opts.lang }">`)
			assert.include(data, `<title>${ opts.title }</title>`)
			assert.include(data, `<meta name="description" content="${ opts.description }">`)

		})

	})

	it('should render a page with components', function() {

		this.timeout(10000)

		const componentName = uuid()

		const structure = [
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
		]

		return fsify(structure).then((structure) => {

			const opts = {
				src: structure[0].name
			}

			return index(null, opts)

		}).then((data) => {

			assert.include(data, componentName)

		})

	})

})
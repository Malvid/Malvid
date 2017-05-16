'use strict'

const os = require('os')
const fs = require('fs')
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

			assert.strictEqual(`'opts' must be undefined, null or an object`, err.message)

		})

	})

	it('should render a page with siteData', function() {

		this.timeout(5000)

		const opts = {
			siteData: {
				lang: uuid(),
				title: uuid(),
				description: uuid()
			}
		}

		return index(null, opts).then((data) => {

			assert.include(data, `<html lang="${ opts.siteData.lang }">`)
			assert.include(data, `<title>${ opts.siteData.title }</title>`)
			assert.include(data, `<meta name="description" content="${ opts.siteData.description }">`)

		})

	})

	it.only('should render a page with components', function() {

		this.timeout(5000)

		const componentName = uuid()

		const structure = [
			{
				type: fsify.DIRECTORY,
				name: uuid(),
				contents: [
					{
						type: fsify.DIRECTORY,
						name: componentName,
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
							}
						]
					}
				]
			}
		]

		return fsify(structure).then((structure) => {

			const opts = {
				componentLookup: {
					pattern: '*/[^_]*.njk',
					opts: {
						cwd: structure[0].name,
						dataPaths: (fileName) => [ `${ fileName }.data.json` ]
					}
				}
			}

			return index(null, opts)

		}).then((data) => {

			assert.include(data, componentName)

			fs.writeFileSync('./index.html', data)

		})

	})

})
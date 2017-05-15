'use strict'

const fs = require('fs')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const index = require('./../src/index')

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

	it('should render a page', function() {

		this.timeout(5000)

		return index().then((data) => {

			fs.writeFileSync('./index.html', data)

		})

	})

})
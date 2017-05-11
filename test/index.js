'use strict'

const fs     = require('fs')
// const os     = require('os')
// const path   = require('path')
const assert = require('chai').assert
// const uuid   = require('uuid/v4')
const index  = require('./../src/index')

// const fsify = require('fsify')({
// 	cwd        : os.tmpdir(),
// 	persistent : false,
// 	force      : true
// })

describe('index()', function() {

	it('should return an error when called with invalid options', function() {

		return index(null, '').then((data) => {

			throw new Error('Returned without error')

		}, (err) => {

			assert.strictEqual(`'opts' must be undefined, null or an object`, err.message)

		})

	})

	it('should render a page', function() {

		this.timeout(5000)

		return index().then((data) => {

			assert.isString(data)

			fs.writeFileSync('./index.html', str)

		})

	})

})
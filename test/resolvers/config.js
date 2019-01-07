'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid/v4')
const config = require('../../src/resolvers/config')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('config', function() {

	it('should be an object with resolver specific properties', function() {

		assert.isObject(config)
		assert.isString(config.id)
		assert.isString(config.label)
		assert.isArray(config.languages)
		assert.isFunction(config.resolve)

	})

	it('should have a resolve function that returns an array', function() {

		const filename = uuid()
		const result = config.resolve(filename)

		assert.isArray(result)

	})

	it('should have a parse function that works with empty files', async function() {

		const contents = ''
		const result = await config.parse(contents)

		assert.deepEqual(result, {})

	})

	it('should have a parse function that requires files', async function() {

		const obj = {
			prop: uuid()
		}

		const structure = await fsify([
			{
				type: fsify.FILE,
				name: `${ uuid() }.js`,
				contents: `
					module.exports = ${ JSON.stringify(obj) }
				`
			}
		])

		const result = await config.parse(uuid(), structure[0].name)

		assert.deepEqual(result, obj)

	})

})
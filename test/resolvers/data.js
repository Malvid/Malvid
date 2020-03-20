'use strict'

const os = require('os')
const assert = require('chai').assert
const uuid = require('uuid').v4
const data = require('../../src/resolvers/data')

const fsify = require('fsify')({
	cwd: os.tmpdir()
})

describe('data', function() {

	it('should be an object with resolver specific properties', function() {

		assert.isObject(data)
		assert.isString(data.id)
		assert.isString(data.label)
		assert.isArray(data.languages)
		assert.isFunction(data.resolve)

	})

	it('should have a resolve function that returns an array', function() {

		const filename = uuid()
		const result = data.resolve(filename)

		assert.isArray(result)

	})

	it('should have a parse function that works with empty files', async function() {

		const contents = ''
		const result = await data.parse(contents)

		assert.strictEqual(result, '{}')

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

		const result = await data.parse(uuid(), structure[0].name)

		assert.deepEqual(JSON.parse(result), obj)

	})

})
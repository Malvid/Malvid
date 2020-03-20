'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const notes = require('../../src/resolvers/notes')

describe('notes', function() {

	it('should be an object with resolver specific properties', function() {

		assert.isObject(notes)
		assert.isString(notes.id)
		assert.isString(notes.label)
		assert.isArray(notes.languages)
		assert.isFunction(notes.resolve)

	})

	it('should have a resolve function that returns an array', function() {

		const filename = uuid()
		const result = notes.resolve(filename)

		assert.isArray(result)

	})

})
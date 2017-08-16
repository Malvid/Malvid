'use strict'

const assert = require('chai').assert
const uuid = require('uuid/v4')
const errorToState = require('../../src/utils/errorToState')

describe('errorToState', function() {

	it('should return an object with the error message', function() {

		const message = uuid()
		const err = new Error(message)
		const state = errorToState(err)

		assert.deepEqual(state, {
			error: message
		})

	})

})
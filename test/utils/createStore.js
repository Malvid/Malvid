'use strict'

const assert = require('chai').assert
const createStore = require('../../src/utils/createStore')

describe('createStore', function() {

	it('should return an object', function(done) {

		const state = {}

		createStore(state, (err, store) => {

			assert.notExists(err)
			assert.isObject(store)

			done()

		})

	})

})
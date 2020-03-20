'use strict'

const assert = require('chai').assert
const uuid = require('uuid').v4
const eventPos = require('../../src/utils/eventPos')

describe('eventPos()', function() {

	it('should extract pageX and pageY out of an event', function() {

		const e = {
			pageX: uuid(),
			pageY: uuid()
		}

		const result = eventPos(e)

		assert.deepEqual(result, {
			x: e.pageX,
			y: e.pageY
		})

	})

})
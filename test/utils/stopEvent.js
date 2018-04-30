'use strict'

const stopEvent = require('../../src/utils/stopEvent')

describe('stopEvent()', function() {

	it('should call stopPropagation', function(done) {

		const e = {
			stopPropagation: () => done()
		}

		stopEvent(e)

	})

	it('should call preventDefault', function(done) {

		const e = {
			preventDefault: () => done()
		}

		stopEvent(e)

	})

})
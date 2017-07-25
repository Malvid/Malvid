'use strict'

const { HYDRATE } = require('../constants/actions')

module.exports = (state) => ({
	type: HYDRATE,
	state
})
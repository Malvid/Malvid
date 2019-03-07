'use strict'

const createStore = require('./utils/createStore')
const layout = require('./utils/layout')

module.exports = (initialState, css, js, next) => {

	createStore(initialState, (err, store) => {

		if (err != null) return next(err)

		const opts = store.getState().opts
		const html = layout('<div id="main"></div>', css, js, opts)

		next(null, html)

	})

}
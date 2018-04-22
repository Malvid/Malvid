'use strict'

const createStore = require('./utils/createStore')
const layout = require('./utils/layout')

module.exports = (initalState, js, next) => {

	createStore(initalState, (err, store) => {

		if (err != null) return next(err)

		const opts = store.getState().opts
		const html = layout('<div id="main"></div>', js, opts)

		next(null, html)

	})

}
'use strict'

const { css } = require('glamor')

const createStore = require('./utils/createStore')
const start = require('./layout/start')
const end = require('./layout/end')

module.exports = (initalState, js, next) => {

	createStore(initalState, (err, store) => {

		if (err!=null) return next(err)

		const state = store.getState()

		next(null, `
			${ start(state) }
			<div id="main"></div>
			${ end(state, js) }
		`)

	})

}
const createHistory = require('history').createHashHistory

const parseRoute = require('./parseRoute')

module.exports = (store, action) => {

	const history = createHistory()

	const listen = history.listen

	const location = () => history.location

	const parse = (location) => {

		const components = store.getState().components
		const parsedRoute = parseRoute(location, components)

		console.log(parsedRoute);

		store.dispatch(action(parsedRoute.componentId, parsedRoute.tabId))

	}

	return {
		listen,
		location,
		parse
	}

}
'use strict'

module.exports = (fn, delay) => {

	const next = () => setTimeout(
		() => module.exports(fn, delay),
		delay
	)

	fn(next)

}
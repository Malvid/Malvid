'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const requestState = require('../utils/requestState')
const errorToState = require('../utils/errorToState')

const style = {

	self: css({
		flexGrow: '1',
		padding: '.5em',
		minHeight: '0',
		border: 'none'
	})

}

module.exports = ({ id, url, hydrate }) => (

	h('iframe', {
		key: id,
		id: 'iframe',
		className: style.self.toString(),
		src: url,
		onLoad: () => requestState(location.href)
			.then(hydrate, (err) => hydrate(errorToState(err)))
			.catch(console.error)
	})

)

module.exports.displayName = 'Frame'

module.exports.propTypes = {

	id: propTypes.string.isRequired,
	url: propTypes.string.isRequired,
	hydrate: propTypes.func.isRequired

}
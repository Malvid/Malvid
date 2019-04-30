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

module.exports = (props) => (

	h('iframe', {
		key: props.currentComponent.id,
		id: 'iframe',
		className: style.self.toString(),
		src: props.currentComponent.url,
		onLoad: () => requestState(location.href)
			.then(props.hydrate, (err) => props.hydrate(errorToState(err)))
			.catch(console.error)
	})

)

module.exports.displayName = 'Frame'

module.exports.propTypes = {

	currentComponent: propTypes.object.isRequired,
	hydrate: propTypes.func.isRequired

}
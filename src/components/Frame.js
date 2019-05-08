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

const Frame = (props) => {

	return (
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

}

Frame.displayName = 'Frame'

Frame.propTypes = {

	currentComponent: propTypes.object.isRequired,
	hydrate: propTypes.func.isRequired

}

module.exports = Frame
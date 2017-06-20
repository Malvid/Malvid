'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

const style = {

	self: css({
		marginRight: '.5em'
	})

}

module.exports = ({ icon }) => (

	h('div', {
		className: `ion ${ icon } ${ style.self.toString() }`
	})

)

module.exports.propTypes = {

	icon: propTypes.string.isRequired

}
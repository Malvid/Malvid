'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')
const highlight = require('highlight.js')

const h = require('../utils/h')
const selectable = require('../styles/selectable')

const style = {

	self: css({
		flexGrow: '1',
		margin: '0',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	}),

	code: css(selectable, {
		display: 'block',
		padding: '1.5em 2em'
	})

}

module.exports = ({ data, languages }) => (

	h('pre', { className: style.self.toString() },
		h('code', {
			className: style.code.toString(),
			dangerouslySetInnerHTML: {
				__html: highlight.highlightAuto(data, languages).value
			}
		})
	)

)

module.exports.propTypes = {

	data: propTypes.string.isRequired,
	languages: propTypes.array.isRequired

}
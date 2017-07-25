'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')
const highlight = require('highlight.js')

const h = require('../utils/h')
const selectable = require('../styles/selectable')

const style = {

	self: css({
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'column',
		margin: '0'
	}),

	code: css(selectable, {
		flexGrow: '1',
		padding: '1.5em 2em',
		height: '100%',
		background: 'transparent',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
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
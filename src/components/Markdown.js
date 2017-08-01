'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')
const marked = require('marked')
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

	content: css(selectable, {
		padding: '1.5em 2em'
	})

}

module.exports = ({ data }) => (

	h('div', { className: style.self.toString() },
		h('div', {
			className: `${ style.content.toString() } markdown`,
			dangerouslySetInnerHTML: {
				__html: marked(data, {
					highlight: (code) => highlight.highlightAuto(code).value
				})
			}
		})
	)

)

module.exports.propTypes = {

	data: propTypes.string.isRequired

}
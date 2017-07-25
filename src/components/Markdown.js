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
		display: 'flex',
		flexDirection: 'column',
		margin: '0'
	}),

	content: css(selectable, {
		flexGrow: '1',
		padding: '1.5em 2em',
		height: '100%',
		background: 'transparent',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
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
'use strict'

const { h } = require('preact')
const { css } = require('glamor')
const marked = require('marked')
const highlight = require('highlight.js')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column',
		margin: '0'
	}),

	content: css({
		flex: '1 1 auto',
		padding: '1.5em 2em',
		height: '100%',
		background: 'transparent',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	})

}

module.exports = ({ data }) => (

	h('div', { class: style.self.toString() },
		h('div', {
			class: `${ style.content.toString() } markdown`,
			dangerouslySetInnerHTML: {
				__html: marked(data, {
					highlight: (code) => highlight.highlightAuto(code).value
				})
			}
		})
	)

)
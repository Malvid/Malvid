'use strict'

const { css } = require('glamor')
const marked = require('marked')
const highlight = require('highlight.js')

const h = require('../utils/h')

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
		WebkitOverflowScrolling: 'touch',
		WebkitUserSelect: 'auto',
		MozUserSelect: 'auto',
		MsUserSelect: 'auto',
		UserSelect: 'auto'
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
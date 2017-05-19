'use strict'

const { h } = require('preact')
const { css } = require('glamor')
const highlight = require('highlight.js')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column',
		margin: '0'
	}),

	code: css({
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

module.exports = ({ data, languages }) => (

	h('pre', { class: style.self.toString() },
		h('code', {
			class: style.code.toString(),
			dangerouslySetInnerHTML: {
				__html: highlight.highlightAuto(data, languages).value
			}
		})
	)

)
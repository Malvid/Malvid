'use strict'

const { css } = require('glamor')
const highlight = require('highlight.js')

const h = require('../utils/h')

const style = {

	self: css({
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'column',
		margin: '0'
	}),

	code: css({
		flexGrow: '1',
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

	h('pre', { className: style.self.toString() },
		h('code', {
			className: style.code.toString(),
			dangerouslySetInnerHTML: {
				__html: highlight.highlightAuto(data, languages).value
			}
		})
	)

)
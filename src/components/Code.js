'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const link = require('../utils/link')
const createRoute = require('../utils/createRoute')
const highlight = require('../utils/highlight')
const selectable = require('../styles/selectable')
const { BLUE } = require('../constants/colors')

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
	}),

	link: css({
		color: BLUE
	})

}

const Code = (props) => {

	return (
		h('pre', { className: style.self.toString() },
			h('code', {
				className: style.code.toString(),
				dangerouslySetInnerHTML: {
					__html: link(
						highlight.highlightAuto(props.currentTab.data, props.currentTab.languages).value,
						props.components,
						(component, filename) => `<a class="${ style.link.toString() }" href="${ createRoute(component.id, props.currentTab.id) }">${ filename }</a>`
					)
				}
			})
		)
	)

}

Code.displayName = 'Code'

Code.propTypes = {

	components: propTypes.array.isRequired,
	currentTab: propTypes.object.isRequired

}

module.exports = Code
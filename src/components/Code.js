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

module.exports = ({ components, currentTab }) => (

	h('pre', { className: style.self.toString() },
		h('code', {
			className: style.code.toString(),
			dangerouslySetInnerHTML: {
				__html: link(
					highlight.highlightAuto(currentTab.data, currentTab.languages).value,
					components,
					(component, filename) => `<a class="${ style.link.toString() }" href="${ createRoute(component.id, currentTab.id) }">${ filename }</a>`
				)
			}
		})
	)

)

module.exports.displayName = 'Code'

module.exports.propTypes = {

	components: propTypes.array.isRequired,
	currentTab: propTypes.object.isRequired

}
'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const { LIGHT } = require('../constants/colors')
const { NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')

const NavItem = require('./NavItem')

const style = {

	self: css({
		display: 'flex',
		flexDirection: 'column',
		padding: '0 0 0 1em',
		minWidth: NAV_MIN_WIDTH,
		width: `calc(${ NAV_WIDTH } - var(--currentSize-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ CONTENT_MIN_WIDTH })`
	}),

	scroller: css({
		flex: '1 1 auto',
		padding: '1em 0',
		height: '100%',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	})

}

module.exports = ({ components, currentComponent, setCurrentComponent }) => (

	h('nav', { className: style.self.toString() },
		h('div', { className: style.scroller.toString() },
			components.map((component) =>
				h(NavItem, {
					key: component.id,
					id: component.id,
					label: component.name,
					active: component.id===(currentComponent || {}).id,
					setCurrentComponent
				})
			)
		)
	)

)
'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const { LIGHT } = require('../styles/colors')
const { NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../styles/sizes')

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

	h('nav', { class: style.self.toString() },
		h('div', { class: style.scroller.toString() },
			components.map((component) =>
				h(NavItem, {
					id: component.id,
					label: component.name,
					active: component.id===(currentComponent || {}).id,
					setCurrentComponent
				})
			)
		)
	)

)
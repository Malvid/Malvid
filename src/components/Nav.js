'use strict'

const { h } = require('preact')
const { css } = require('glamor')

const { LIGHT } = require('../styles/colors')

const NavItem = require('./NavItem')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column',
		padding: '0 .5em 0 1em',
		width: '300px'
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
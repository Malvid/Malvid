'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const createRoute = require('../utils/createRoute')
const getTabs = require('../selectors/getTabs')

const Tab = require('./Tab')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex'
	})

}

module.exports = (props) => (

	h('div', { className: style.self.toString() },
		getTabs(props.currentComponent).map((tab) =>
			h(Tab, {
				key: tab.id,
				label: tab.label,
				active: tab.id === props.currentTab.id,
				href: createRoute(props.currentComponent.id, tab.id)
			})
		)
	)

)

module.exports.displayName = 'Tabs'

module.exports.propTypes = {

	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired

}
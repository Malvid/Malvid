'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const getTabs = require('../selectors/getTabs')

const Tab = require('./Tab')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex'
	})

}

module.exports = ({ currentComponent, currentTab, setCurrentTab }) => (

	h('div', { className: style.self.toString() },
		getTabs(currentComponent).map((tab) =>
			h(Tab, {
				key: tab.id,
				id: tab.id,
				label: tab.label,
				active: tab.id===currentTab.id,
				setCurrentTab
			})
		)
	)

)

module.exports.propTypes = {

	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired,
	setCurrentTab: propTypes.func.isRequired

}
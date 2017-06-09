'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')
const upperCamelCase = require('uppercamelcase')

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
		getTabs(currentComponent).map((key) =>
			h(Tab, {
				key: key,
				id: key,
				label: upperCamelCase(key),
				active: key===currentTab,
				setCurrentTab
			})
		)
	)

)

module.exports.propTypes = {

	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.string.isRequired,
	setCurrentTab: propTypes.func.isRequired

}
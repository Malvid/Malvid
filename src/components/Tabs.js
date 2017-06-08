'use strict'

const { css } = require('glamor')
const upperCamelCase = require('uppercamelcase')

const h = require('../utils/h')
const filterTabs = require('../utils/filterTabs')

const Tab = require('./Tab')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex'
	})

}

module.exports = ({ data, currentTab, setCurrentTab }) => (

	h('div', { className: style.self.toString() },
		Object.keys(data).filter(filterTabs).map((key) =>
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
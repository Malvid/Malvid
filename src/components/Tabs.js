'use strict'

const { h } = require('preact')
const { css } = require('glamor')
const upperCamelCase = require('uppercamelcase')

const Tab = require('./Tab')

const style = {

	self: css({
		flex: '0 0 auto',
		display: 'flex'
	})

}

module.exports = ({ data, currentTab, setCurrentTab }) => (

	h('div', { class: style.self.toString() },
		Object.keys(data).map((key) =>
			h(Tab, {
				id: key,
				label: upperCamelCase(key),
				active: key===currentTab,
				setCurrentTab
			})
		)
	)

)
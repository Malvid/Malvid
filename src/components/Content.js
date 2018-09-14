'use strict'

const { css } = require('glamor')

const h = require('../utils/h')

const Preview = require('./Preview')
const Resizer = require('./Resizer')
const Inspector = require('./Inspector')

const style = {

	self: css({
		flexGrow: '1',
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 1em 1em 0',
		minWidth: '0'
	})

}

module.exports = (props) => (

	h('div', { className: style.self.toString() },
		h(Preview, {
			statuses: props.opts.statuses,
			currentComponent: props.currentComponent,
			hydrate: props.hydrate
		}),
		h(Resizer, {
			direction: 'vertical',
			setSize: props.setSizeVertical,
			setSizeStatus: props.setSizeStatus
		}),
		h(Inspector, {
			components: props.components,
			currentComponent: props.currentComponent,
			currentTab: props.currentTab
		})
	)

)

module.exports.displayName = 'Content'
'use strict'

const { css } = require('glamor')

const h = require('../utils/h')
const { NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')

const Preview = require('./Preview')
const Resizer = require('./Resizer')
const Inspector = require('./Inspector')

const style = {

	self: css({
		display: 'flex',
		flexDirection: 'column',
		padding: '1em 1em 1em 0',
		minWidth: CONTENT_MIN_WIDTH,
		width: `calc(100% - ${ NAV_WIDTH } + var(--size-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ NAV_MIN_WIDTH })`
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
			currentComponent: props.currentComponent,
			currentTab: props.currentTab
		})
	)

)
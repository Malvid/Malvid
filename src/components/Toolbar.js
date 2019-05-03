'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const getStatus = require('../selectors/getStatus')
const selectable = require('../styles/selectable')
const { HEIGHT } = require('../constants/sizes')
const { BLUE, MID } = require('../constants/colors')
const { MOBILE_MENU } = require('../constants/breakpoints')

const SelectNav = require('./SelectNav')
const Status = require('./Status')
const IconTab = require('./IconTab')
const IconReload = require('./IconReload')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0 1.2em',
		height: HEIGHT,
		borderBottom: `1px solid ${ MID }`
	}),

	name: css(selectable, {
		margin: '0',
		padding: '.4em',
		fontSize: '1em',
		fontWeight: 'normal',
		[MOBILE_MENU]: {
			display: 'none'
		}
	}),

	tools: css({
		display: 'flex',
		alignItems: 'center'
	}),

	separator: css({
		width: '1em'
	}),

	button: css({
		'padding': '.4em',
		'width': '1.8em',
		'height': '1.8em',
		'background': 'transparent',
		'appearance': 'none',
		'border': 'none',
		'color': 'currentColor',
		'fontSize': '1.2em',
		'textDecoration': 'none',
		'outline': 'none',
		'cursor': 'default',
		':active': {
			color: BLUE
		}
	})

}

module.exports = (props) => {

	const status = getStatus(props.statuses, props.currentComponent)
	const hasStatus = status != null

	return (
		h('div', { className: style.self.toString() },
			h('h1', { className: style.name.toString() },
				props.currentComponent.name
			),
			h(SelectNav, {
				components: props.components,
				currentComponent: props.currentComponent,
				currentTab: props.currentTab
			}),
			h('div', { className: style.tools.toString() },
				h('button', {
					className: style.button.toString(),
					title: 'Refresh preview',
					onClick: () => document.querySelector('#iframe').contentWindow.location.reload()
				},
					h(IconReload)
				),
				h('a', {
					className: style.button.toString(),
					title: 'Open in new tab',
					href: props.currentComponent.url,
					target: '_blank'
				},
					h(IconTab)
				),
				hasStatus === true && h('div', { className: style.separator.toString() }),
				hasStatus === true && h(Status, status)
			)
		)
	)

}

module.exports.displayName = 'Toolbar'

module.exports.propTypes = {

	statuses: propTypes.object.isRequired,
	components: propTypes.array.isRequired,
	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired

}
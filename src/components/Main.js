'use strict'

const { Fragment, useEffect } = require('react')
const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')

const h = require('../utils/h')
const enhanceState = require('../utils/enhanceState')
const actions = require('../actions')
const { SIZE_STATUS_ACTIVE } = require('../constants/size')

const Nav = require('./Nav')
const Resizer = require('./Resizer')
const ResizeOverlay = require('./ResizeOverlay')
const Content = require('./Content')
const Empty = require('./Empty')

const mapStateToProps = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const Main = (props) => {

	const hasError = props.error != null
	const hasNoComponent = props.currentComponent == null

	const title = (() => {

		if (hasError === true) return 'Malvid'
		if (hasNoComponent === true) return props.opts.title

		return `${ props.currentComponent.name } | ${ props.opts.title }`

	})()

	useEffect(() => { document.documentElement.style.setProperty('--size-vertical', `${ props.size.vertical }px`) }, [ props.size.vertical ])
	useEffect(() => { document.documentElement.style.setProperty('--size-horizontal', `${ props.size.horizontal }px`) }, [ props.size.horizontal ])
	useEffect(() => { document.title = title }, [ title ])

	// Something went wrong
	if (hasError === true) return (
		h(Empty, {
			color: 'currentColor',
			text: props.error
		})
	)

	// No currentComponent means that there are no components at all
	if (hasNoComponent === true) return (
		h(Empty, {
			color: 'currentColor',
			text: 'No components found'
		})
	)

	return (
		h(Fragment, {},
			h(Nav, {
				opts: props.opts,
				components: props.components,
				currentComponent: props.currentComponent,
				currentTab: props.currentTab,
				filter: props.filter,
				setFilter: props.setFilter
			}),
			h(Resizer, {
				direction: 'horizontal',
				size: props.size,
				setSize: props.setSizeHorizontal,
				setSizeStatus: props.setSizeStatus
			}),
			h(Content, props),
			h(ResizeOverlay, {
				visible: props.size.status === SIZE_STATUS_ACTIVE
			})
		)
	)

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main)
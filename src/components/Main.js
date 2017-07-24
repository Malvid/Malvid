'use strict'

const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const { css } = require('glamor')

const h = require('../utils/h')
const enhanceState = require('../utils/enhanceState')
const actions = require('../actions')
const { DARK } = require('../constants/colors')
const { CURRENT_SIZE_STATUS_ACTIVE } = require('../constants/currentSize')

const DocumentTitle = require('react-document-title')
const ResizeOverlay = require('./ResizeOverlay')
const Nav = require('./Nav')
const Resizer = require('./Resizer')
const Content = require('./Content')
const Empty = require('./Empty')

const mapStateToProps    = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const style = {

	self: css({
		display: 'flex',
		width: '100%'
	})

}

const Main = (props) => {

	// No currentComponent means that there are no components at all
	if (props.currentComponent==null) return (
		h(DocumentTitle, { title: props.opts.title },
			h(Empty, {
				color: DARK,
				text: 'No components found'
			})
		)
	)

	return (
		h(DocumentTitle, { title: `${ props.currentComponent.name } | ${ props.opts.title }` },
			h('div', {
				id: 'main',
				className: style.self.toString(),
				style: {
					'--currentSize-vertical': `${ props.currentSize.vertical }px`,
					'--currentSize-horizontal': `${ props.currentSize.horizontal }px`
				}
			},
				h(Nav, {
					statuses: props.opts.statuses,
					components: props.components,
					currentComponent: props.currentComponent,
					currentTab: props.currentTab
				}),
				h(Resizer, {
					direction: 'horizontal',
					setCurrentSize: props.setCurrentSizeHorizontal,
					setCurrentSizeStatus: props.setCurrentSizeStatus
				}),
				h(Content, props),
				h(ResizeOverlay, {
					visible: props.currentSize.status===CURRENT_SIZE_STATUS_ACTIVE
				})
			)
		)
	)

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main)
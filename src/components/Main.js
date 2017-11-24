'use strict'

const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const { css } = require('glamor')

const h = require('../utils/h')
const enhanceState = require('../utils/enhanceState')
const actions = require('../actions')
const { SIZE_STATUS_ACTIVE } = require('../constants/size')

const DocumentTitle = require('react-document-title')
const ResizeOverlay = require('./ResizeOverlay')
const Nav = require('./Nav')
const Resizer = require('./Resizer')
const Content = require('./Content')
const Empty = require('./Empty')

const mapStateToProps = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const style = {

	self: css({
		flexGrow: 1,
		display: 'flex',
		minWidth: 0,
		minHeight: 0
	})

}

const Main = (props) => {

	if (props.error!=null) return (
		h(DocumentTitle, { title: 'Malvid' },
			h(Empty, {
				color: 'currentcolor',
				text: props.error
			})
		)
	)

	// No currentComponent means that there are no components at all
	if (props.currentComponent==null) return (
		h(DocumentTitle, { title: props.opts.title },
			h(Empty, {
				color: 'currentcolor',
				text: 'No components found'
			})
		)
	)

	return (
		h(DocumentTitle, { title: `${ props.currentComponent.name } | ${ props.opts.title }` },
			h('div', {
				className: style.self.toString(),
				style: {
					'--size-vertical': `${ props.size.vertical }px`,
					'--size-horizontal': `${ props.size.horizontal }px`
				}
			},
				h(Nav, {
					statuses: props.opts.statuses,
					components: props.components,
					currentComponent: props.currentComponent,
					currentTab: props.currentTab,
					filter: props.filter,
					setFilter: props.setFilter
				}),
				h(Resizer, {
					direction: 'horizontal',
					setSize: props.setSizeHorizontal,
					setSizeStatus: props.setSizeStatus
				}),
				h(Content, props),
				h(ResizeOverlay, {
					visible: props.size.status===SIZE_STATUS_ACTIVE
				})
			)
		)
	)

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main)
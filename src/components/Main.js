'use strict'

const { bindActionCreators } = require('redux')
const { connect } = require('react-redux')
const { css } = require('glamor')

const h = require('../utils/h')
const enhanceState = require('../utils/enhanceState')
const actions = require('../actions')
const { DARK } = require('../constants/colors')

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
	if (props.currentComponent==null) return h(Empty, {
		color: DARK,
		text: 'No components found'
	})

	return (
		h('div', {
			id: 'main',
			className: style.self.toString()
		},
			h(Nav, {
				statuses: props.opts.statuses,
				components: props.components,
				currentComponent: props.currentComponent
			}),
			h(Resizer, {
				direction: 'horizontal',
				setCurrentSize: props.setCurrentSizeHorizontal,
				setCurrentSizeStatus: props.setCurrentSizeStatus
			}),
			h(Content, props)
		)
	)

}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main)
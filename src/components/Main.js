'use strict'

const { bindActionCreators } = require('redux')
const { h } = require('preact')
const { connect } = require('preact-redux')
const { css } = require('glamor')

const enhanceState = require('../utils/enhanceState')
const actions = require('../actions')

const Nav = require('./Nav')
const Resizer = require('./Resizer')
const Content = require('./Content')

const mapStateToProps    = (state) => enhanceState(state)
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const style = {

	self: css({
		display: 'flex',
		width: '100%'
	})

}

const Main = (props) => (

	h('div', {
		id: 'main',
		class: style.self.toString()
	},
		h(Nav, {
			components: props.components,
			currentSize: props.currentSize,
			currentComponent: props.currentComponent,
			setCurrentComponent: props.setCurrentComponent
		}),
		h(Resizer, {
			direction: 'horizontal',
			setCurrentSize: props.setCurrentSizeHorizontal
		}),
		h(Content, props)
	)

)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main)
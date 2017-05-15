'use strict'

const { bindActionCreators } = require('redux')
const { h } = require('preact')
const { connect } = require('preact-redux')
const { css } = require('glamor')

const Nav = require('./Nav')
const Content = require('./Content')
const actions = require('../actions')

const mapStateToProps    = (state) => state
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const style = {

	self: css({
		display: 'flex',
		width: '100%'
	})

}

const Main = (props) => (
	h('div', { class: style.self.toString() },
		h(Nav, props),
		h(Content, props)
	)
)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Main)
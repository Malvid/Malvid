'use strict'

const { h, Component } = require('preact')
const { css } = require('glamor')
const highlight = require('highlight.js')

const style = {

	self: css({
		flex: '1 1 auto',
		display: 'flex',
		flexDirection: 'column',
		margin: '0'
	}),

	code: css({
		flex: '1 1 auto',
		padding: '1em',
		height: '100%',
		background: 'transparent',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	})

}

module.exports = class extends Component {

	resetCode(elem) {

		elem.innerHTML = ''
		elem.classList.remove(...highlight.listLanguages())

	}

	highlightCode(elem, languages) {

		highlight.configure({ languages })
		highlight.highlightBlock(elem)

	}

	componentDidMount() {

		this.highlightCode(this.ref, this.props.languages)

	}

	componentWillUpdate() {

		this.resetCode(this.ref)

	}

	componentDidUpdate() {

		this.highlightCode(this.ref, this.props.languages)

	}

	render({ code }) {

		return (
			h('pre', { class: style.self.toString() },
				h('code', {
					class: style.code.toString(),
					ref: (ref) => this.ref = ref
				},
					code
				)
			)
		)

	}

}
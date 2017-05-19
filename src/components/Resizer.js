'use strict'

const { h, Component } = require('preact')
const { css } = require('glamor')

const isClient = require('../utils/isClient')
const eventPos = require('../utils/eventPos')
const mousePos = require('../utils/mousePos')

const style = {

	self: css({
		flex: '0 0 auto',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '.4em',
		'> *': {
			opacity: 0
		},
		'&:hover > *': {
			opacity: 1
		}
	}),

	selfVertical: css({
		flexDirection: 'column',
		cursor: 'ns-resize'
	}),

	selfHorizontal: css({
		flexDirection: 'row',
		cursor: 'ew-resize'
	}),

	handle: css({
		margin: '.5px',
		background: 'rgba(0, 0, 0, .15)',
		transition: 'opacity .3s ease'
	}),

	handleVertical: css({
		width: '30px',
		height: '1px'
	}),

	handleHorizontal: css({
		width: '1px',
		height: '30px'
	})

}

module.exports = class extends Component {

	constructor(props) {

		super(props)

		this.setState({
			isResizing: false
		})

	}

	onMouseDown(e) {

		console.log('start')

		this.setState({
			isResizing: true,
			startPos: this.state.startPos || eventPos(e)
		})

		document.documentElement.onmouseup = () => {

			this.setState({
				isResizing: false
			})

		}

		this.onResize.bind(this)()

	}

	onMouseUp() {

		console.log('stop')

		this.setState({
			isResizing: false
		})

	}

	onResize() {

		if (this.state.isResizing===false) return

		const self = this.onResize.bind(this)
		const direction = this.props.direction

		const offsets = {
			vertical: this.state.startPos.y - mousePos().y,
			horizontal: this.state.startPos.x - mousePos().x
		}

		this.props.setCurrentSize(offsets[direction])

		requestAnimationFrame(self)

	}

	render({ direction }) {

		return (
			h('div', {
				ref: (ref) => this.ref = ref,
				onMouseDown: this.onMouseDown.bind(this),
				onMouseUp: this.onMouseUp.bind(this),
				class: css(
					style.self,
					direction==='horizontal' && style.selfHorizontal,
					direction==='vertical' && style.selfVertical
				).toString()
			},
				Array.apply(null, { length: 3 }).map((component) =>
					h('div', {
						class: css(
							style.handle,
							direction==='horizontal' && style.handleHorizontal,
							direction==='vertical' && style.handleVertical
						).toString()
					})
				)
			)
		)

	}

}
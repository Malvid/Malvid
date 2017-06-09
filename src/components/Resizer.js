'use strict'

const { Component } = require('react')
const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const eventPos = require('../utils/eventPos')
const mousePos = require('../utils/mousePos')
const { CURRENT_SIZE_STATUS_INACTIVE, CURRENT_SIZE_STATUS_ACTIVE } = require('../constants/currentSize')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '.4em',
		transition: 'opacity .3s ease',
		':hover': {
			opacity: 1
		}
	}),

	selfVisibility: ({ status }) => css({
		opacity: status===CURRENT_SIZE_STATUS_ACTIVE ? 1 : 0
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
		background: 'rgba(0, 0, 0, .15)'
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

		this.state = {
			status: CURRENT_SIZE_STATUS_INACTIVE,
			startPos: null
		}

	}

	componentDidMount() {

		this.onResize.bind(this)()

	}

	onMouseDown(e) {

		this.props.setCurrentSizeStatus(CURRENT_SIZE_STATUS_ACTIVE)

		this.setState({
			status: CURRENT_SIZE_STATUS_ACTIVE,
			startPos: this.state.startPos || eventPos(e)
		})

		document.documentElement.onmouseup = () => {

			this.props.setCurrentSizeStatus(CURRENT_SIZE_STATUS_INACTIVE)

			this.setState({
				status: CURRENT_SIZE_STATUS_INACTIVE
			})

		}

	}

	onResize() {

		const self = this.onResize.bind(this)

		if (this.state.status==CURRENT_SIZE_STATUS_ACTIVE) {

			const direction = this.props.direction

			const offsets = {
				vertical: this.state.startPos.y - mousePos().y,
				horizontal: this.state.startPos.x - mousePos().x
			}

			this.props.setCurrentSize(offsets[direction])

		}

		requestAnimationFrame(self)

	}

	render() {

		const direction = this.props.direction

		return (
			h('div', {
				ref: (ref) => this.ref = ref,
				onMouseDown: this.onMouseDown.bind(this),
				className: css(
					style.self,
					style.selfVisibility({ status: this.state.status }),
					direction==='horizontal' && style.selfHorizontal,
					direction==='vertical' && style.selfVertical
				).toString()
			},
				Array.apply(null, { length: 3 }).map((item, i) =>
					h('div', {
						key: i,
						className: css(
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

module.exports.propTypes = {

	direction: propTypes.string.isRequired,
	setCurrentSizeStatus: propTypes.func.isRequired,
	setCurrentSize: propTypes.func.isRequired

}
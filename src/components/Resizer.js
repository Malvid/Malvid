'use strict'

const { Component } = require('react')
const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const eventPos = require('../utils/eventPos')
const mousePos = require('../utils/mousePos')
const { SIZE_STATUS_INACTIVE, SIZE_STATUS_ACTIVE } = require('../constants/size')
const { MOBILE_MENU } = require('../constants/breakpoints')

const DIRECTION_VERTICAL = 'vertical'
const DIRECTION_HORIZONTAL = 'horizontal'

const style = {

	self: ({ direction }) => css({
		'flexShrink': '0',
		'display': 'flex',
		'justifyContent': 'center',
		'alignItems': 'center',
		'padding': '.4em',
		'transition': 'opacity .3s ease',
		'willChange': 'opacity',
		':hover': {
			opacity: 0.99
		},
		[MOBILE_MENU]: {
			display: direction === DIRECTION_HORIZONTAL ? 'none' : 'flex'
		}
	}),

	selfVisibility: ({ status }) => css({
		opacity: status === SIZE_STATUS_ACTIVE ? 0.99 : 0.01
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
			status: SIZE_STATUS_INACTIVE,
			startPos: null
		}

	}

	componentDidMount() {

		this.onResize.bind(this)()

	}

	onMouseDown(e) {

		this.props.setSizeStatus(SIZE_STATUS_ACTIVE)

		this.setState({
			status: SIZE_STATUS_ACTIVE,
			startPos: this.state.startPos || eventPos(e)
		})

		document.documentElement.addEventListener('mouseup', () => {

			this.props.setSizeStatus(SIZE_STATUS_INACTIVE)

			this.setState({
				status: SIZE_STATUS_INACTIVE
			})

		}, { once: true })

	}

	onResize() {

		const self = this.onResize.bind(this)

		if (this.state.status === SIZE_STATUS_ACTIVE) {

			const offsets = {
				vertical: this.state.startPos.y - mousePos().y,
				horizontal: this.state.startPos.x - mousePos().x
			}

			const hasChanged = this.props.size[this.props.direction] !== offsets[this.props.direction]

			if (hasChanged === true) this.props.setSize(offsets[this.props.direction])

		}

		requestAnimationFrame(self)

	}

	render() {

		const isVertical = this.props.direction === DIRECTION_VERTICAL
		const isHorizontal = this.props.direction === DIRECTION_HORIZONTAL

		return (
			h('div', {
				onMouseDown: this.onMouseDown.bind(this),
				className: css(
					style.self({ direction: this.props.direction }),
					style.selfVisibility({ status: this.props.size.status }),
					isVertical === true && style.selfVertical,
					isHorizontal === true && style.selfHorizontal
				).toString()
			},
				Array.apply(null, { length: 3 }).map((item, i) =>
					h('div', {
						key: i,
						className: css(
							style.handle,
							isVertical === true && style.handleVertical,
							isHorizontal === true && style.handleHorizontal
						).toString()
					})
				)
			)
		)

	}

}

module.exports.displayName = 'Resizer'

module.exports.propTypes = {

	direction: propTypes.oneOf([
		DIRECTION_VERTICAL,
		DIRECTION_HORIZONTAL
	]).isRequired,
	size: propTypes.object.isRequired,
	setSizeStatus: propTypes.func.isRequired,
	setSize: propTypes.func.isRequired

}
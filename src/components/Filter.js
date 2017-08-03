'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { MID } = require('../constants/colors')

// DOM Element reference must be used to select the whole input content
// on focus. The event of onFocus can't be used after a delay.
let elem

const style = {

	self: css({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		marginBottom: '.5em',
		padding: '1.05em 1.2em',
		width: '100%',
		background: MID,
		borderRadius: BORDER_RADIUS
	}),

	icon: css({}),

	input: css({
		position: 'absolute',
		top: '0',
		left: '0',
		padding: '0 0 0 2.6em',
		width: '100%',
		height: '100%',
		background: 'transparent',
		color: 'currentcolor',
		outline: 'none',
		border: '0'
	})

}

module.exports = ({ filter, setFilter }) => (

	h('div', { className: style.self.toString() },
		h('div', {
			className: `${ style.icon.toString() } ion ion-android-search`
		}),
		h('input', {
			className: style.input.toString(),
			placeholder: 'Search…',
			value: filter,
			ref: (_elem) => elem = _elem,
			onFocus: (e) => requestAnimationFrame(() => elem.select()),
			onChange: (e) => setFilter(e.target.value)
		})
	)

)

module.exports.propTypes = {

	filter: propTypes.string.isRequired,
	setFilter: propTypes.func.isRequired

}
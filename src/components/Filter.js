'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS } = require('../constants/sizes')
const { MID } = require('../constants/colors')

const IconSearch = require('./IconSearch')

// DOM Element reference must be used to select the whole input content
// on focus. The event of onFocus can't be used after a delay.
let elem

const style = {

	self: css({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		padding: '1.05em 1.2em',
		width: '100%',
		background: MID,
		borderRadius: BORDER_RADIUS
	}),

	icon: css({
		margin: '0 0 1px',
		width: '1em',
		height: '1em'
	}),

	input: css({
		position: 'absolute',
		top: '0',
		left: '0',
		padding: '0 0 0 2.7em',
		width: '100%',
		height: '100%',
		background: 'transparent',
		color: 'currentcolor',
		font: 'inherit',
		outline: 'none',
		border: '0'
	})

}

module.exports = ({ filter, setFilter }) => (

	h('div', { className: style.self.toString() },
		h('div', { className: style.icon.toString() },
			h(IconSearch)
		),
		h('input', {
			id: 'filter',
			className: style.input.toString(),
			placeholder: 'Search…',
			value: filter,
			ref: (_elem) => elem = _elem,
			onFocus: () => requestAnimationFrame(() => elem.select()),
			onChange: (e) => setFilter(e.target.value)
		})
	)

)

module.exports.propTypes = {

	filter: propTypes.string.isRequired,
	setFilter: propTypes.func.isRequired

}
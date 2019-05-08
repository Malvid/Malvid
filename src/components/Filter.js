'use strict'

const { createRef } = require('react')
const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const { BORDER_RADIUS, HEIGHT } = require('../constants/sizes')
const { MID } = require('../constants/colors')

const IconSearch = require('./IconSearch')

const style = {

	self: css({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		padding: '0 1.2em',
		width: '100%',
		height: HEIGHT,
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
		color: 'currentColor',
		font: 'inherit',
		outline: 'none',
		border: '0'
	})

}

const Filter = (props) => {

	// DOM Element reference must be used to select the whole input content
	// on focus. The event of onFocus can't be used after a delay.
	const elem = createRef()

	return (
		h('div', { className: style.self.toString() },
			h('div', { className: style.icon.toString() },
				h(IconSearch)
			),
			h('input', {
				id: 'filter',
				className: style.input.toString(),
				placeholder: 'Search…',
				autoCorrect: 'off',
				autoCapitalize: 'off',
				autoComplete: 'off',
				value: props.filter,
				ref: elem,
				onFocus: () => requestAnimationFrame(() => elem.current.select()),
				onChange: (e) => props.setFilter(e.target.value)
			})
		)
	)

}

Filter.displayName = 'Filter'

Filter.propTypes = {

	filter: propTypes.string.isRequired,
	setFilter: propTypes.func.isRequired

}

module.exports = Filter
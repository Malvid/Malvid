'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const createRoute = require('../utils/createRoute')
const sort = require('../utils/sort')
const { DARK } = require('../constants/colors')
const { MOBILE_MENU } = require('../constants/breakpoints')

const svg = encodeURIComponent(`
	<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
		<path d="M3 0l-3 3h6l-3-3zm-3 5l3 3 3-3h-6z" transform="translate(1)" fill="${ DARK }"></path>
	</svg>
`)

const style = {

	self: css({
		display: 'none',
		width: '100%',
		flexShrink: '1',
		paddingLeft: '1.2em',
		appearance: 'none',
		background: 'none',
		backgroundImage: `url('data:image/svg+xml,${ svg }')`,
		backgroundSize: '10px',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '0 center',
		border: 'none',
		outline: '0',
		color: 'inherit',
		font: 'inherit',
		lineHeight: '1',
		[MOBILE_MENU]: {
			display: 'block'
		}
	})

}

const SelectNav = (props) => {

	const toItem = (component) => (
		h('option', {
			key: component.id,
			value: createRoute(component.id, props.currentTab.id)
		}, component.name)
	)

	const toGroup = (group, children) => (
		h('optgroup', {
			key: group,
			label: group
		}, children)
	)

	const render = ({ group, components }) => {

		const hasGroup = group !== ''
		const children = components.map(toItem)

		// Always return an array even when it's just one group.
		// This makes handling the response of the function easier.
		return hasGroup === true ? [ toGroup(group, children) ] : children

	}

	const items = sort(props.components, render)

	return (
		h('select', {
			className: style.self.toString(),
			value: createRoute(props.currentComponent.id, props.currentTab.id),
			onChange: (e) => location.href = e.target.value
		}, items)
	)

}

SelectNav.displayName = 'SelectNav'

SelectNav.propTypes = {

	components: propTypes.array.isRequired,
	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired

}

module.exports = SelectNav
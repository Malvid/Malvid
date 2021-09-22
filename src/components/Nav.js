'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')
const createRoute = require('../utils/createRoute')
const filtrate = require('../utils/filtrate')
const sort = require('../utils/sort')
const getStatus = require('../selectors/getStatus')
const { BORDER_RADIUS, NAV_MIN_WIDTH, NAV_WIDTH, CONTENT_MIN_WIDTH } = require('../constants/sizes')
const { MOBILE_MENU } = require('../constants/breakpoints')

const NavLink = require('./NavLink')
const NavGroup = require('./NavGroup')
const NavItem = require('./NavItem')
const NavSeparator = require('./NavSeparator')
const Filter = require('./Filter')
const NavLogo = require('./NavLogo')

const style = {

	self: css({
		flexShrink: '0',
		display: 'flex',
		flexDirection: 'column',
		minWidth: NAV_MIN_WIDTH,
		width: `calc(${ NAV_WIDTH } - var(--size-horizontal, 0px))`,
		maxWidth: `calc(100% - ${ CONTENT_MIN_WIDTH })`,
		[MOBILE_MENU]: {
			display: 'none'
		}
	}),

    navLogo: css({
        padding: '1em 0 0 1em'
    }),

	filter: css({
		flexShrink: '0',
		padding: '1em 0 0 1em',
		marginBottom: `-${ BORDER_RADIUS }`
	}),

	items: css({
		flexGrow: '1',
		padding: `calc(${ BORDER_RADIUS } + .5em) 0 1em 1em`,
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch'
	})

}

const Nav = (props) => {

	const toggleGroup = (group) => {

		const nextFilter = `group:"${ group }"`
		const hasFilter = props.filter === nextFilter

		props.setFilter(hasFilter === true ? '' : nextFilter)

	}

	const toLink = (link) => (
		h(NavLink, {
			key: `${ link.href }${ link.label }`,
			label: link.label,
			href: link.href
		})
	)

	const toItem = (component) => (
		h(NavItem, {
			key: component.id,
			label: component.name,
			status: props.opts.statuses[getStatus(component)],
			active: component.id === props.currentComponent.id,
			href: createRoute(component.id, props.currentTab.id)
		})
	)

	const toGroup = (group, children) => (
		h(NavGroup, {
			key: group,
			label: group,
			onClick: () => toggleGroup(group)
		}, children)
	)

	const links = sort.links(
		filtrate.links(props.opts.links, props.filter),
		toLink
	)

	const items = sort.components(
		filtrate.components(props.components, props.filter),
		({ group, components }) => {

			const hasGroup = group !== ''
			const children = components.map(toItem)

			// Always return an array even when it's just one group.
			// This makes handling the response of the function easier.
			return hasGroup === true ? [ toGroup(group, children) ] : children

		}
	)

	const needsSeparator = links.length > 0 && items.length > 0

	return (
		h('nav', { className: style.self.toString() },
            ('logo' in props.opts && props.opts.logo) ? h('div', { className: style.navLogo.toString() },
                h(NavLogo, {
                    logo: props.opts.logo
                })
            ) : null,
			h('div', { className: style.filter.toString() },
				h(Filter, {
					filter: props.filter,
					setFilter: props.setFilter
				})
			),
			h('div', { className: style.items.toString() }, [
				...links,
				needsSeparator === true ? h(NavSeparator) : undefined,
				...items
			])
		)
	)

}

Nav.displayName = 'Nav'

Nav.propTypes = {

	opts: propTypes.object.isRequired,
	components: propTypes.array.isRequired,
	currentComponent: propTypes.object.isRequired,
	currentTab: propTypes.object.isRequired,
	filter: propTypes.string.isRequired,
	setFilter: propTypes.func.isRequired

}

module.exports = Nav
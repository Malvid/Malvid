'use strict'

const { css } = require('glamor')
const propTypes = require('prop-types')

const h = require('../utils/h')

const style = {

    self: css({
        display: 'block',
        maxWidth: '100%'
    })
}

const NavLogo = (props) => {

    return (
        h('img', {
            src: props.logo,
            className: style.self.toString()
        })
    )
};

NavLogo.displayName = 'NavLogo'

NavLogo.propTypes = {

    logo: propTypes.string.isRequired

}

module.exports = NavLogo

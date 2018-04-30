'use strict'

module.exports = (e) => {

	if (typeof e.stopPropagation === 'function') e.stopPropagation()
	if (typeof e.preventDefault === 'function') e.preventDefault()

}
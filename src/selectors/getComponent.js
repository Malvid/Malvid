'use strict'

module.exports = (components, componentId) => {

	return components.filter((component) => component.id === componentId)[0]

}
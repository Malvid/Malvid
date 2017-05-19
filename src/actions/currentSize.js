const { SET_CURRENT_SIZE_VERTICAL, SET_CURRENT_SIZE_HORIZONTAL } = require('./types')

const setCurrentSizeVertical = (size) => ({
	type: SET_CURRENT_SIZE_VERTICAL,
	size
})

const setCurrentSizeHorizontal = (size) => ({
	type: SET_CURRENT_SIZE_HORIZONTAL,
	size
})

module.exports = {
	setCurrentSizeVertical,
	setCurrentSizeHorizontal
}

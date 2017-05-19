const { SET_CURRENT_SIZE_VERTICAL, SET_CURRENT_SIZE_HORIZONTAL } = require('../actions/types')

const defaultState = {
	vertical: 0,
	horizontal: 0
}

const setCurrentSizeVertical = ({ horizontal }, size) => ({
	vertical: size,
	horizontal
})

const setCurrentSizeHorizontal = ({ vertical }, size) => ({
	vertical,
	horizontal: size
})

module.exports = (state = defaultState, action) => {

	switch (action.type) {
		case SET_CURRENT_SIZE_VERTICAL   : return setCurrentSizeVertical(state, action.size)
		case SET_CURRENT_SIZE_HORIZONTAL : return setCurrentSizeHorizontal(state, action.size)
		default                          : return state
	}

}
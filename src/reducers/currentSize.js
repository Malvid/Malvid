const { SET_CURRENT_SIZE_STATUS, SET_CURRENT_SIZE_VERTICAL, SET_CURRENT_SIZE_HORIZONTAL } = require('../constants/actions')
const { CURRENT_SIZE_STATUS_INACTIVE, CURRENT_SIZE_STATUS_ACTIVE } = require('../constants/currentSize')

const defaultState = {
	status: CURRENT_SIZE_STATUS_INACTIVE,
	vertical: 0,
	horizontal: 0
}

const setCurrentSizeStatus = ({ vertical, horizontal }, status) => ({
	status: status===CURRENT_SIZE_STATUS_ACTIVE ? CURRENT_SIZE_STATUS_ACTIVE : CURRENT_SIZE_STATUS_INACTIVE,
	vertical,
	horizontal
})

const setCurrentSizeVertical = ({ status, horizontal }, size) => ({
	status,
	vertical: size,
	horizontal
})

const setCurrentSizeHorizontal = ({ status, vertical }, size) => ({
	status,
	vertical,
	horizontal: size
})

module.exports = (state = defaultState, action) => {

	switch (action.type) {
		case SET_CURRENT_SIZE_STATUS     : return setCurrentSizeStatus(state, action.status)
		case SET_CURRENT_SIZE_VERTICAL   : return setCurrentSizeVertical(state, action.size)
		case SET_CURRENT_SIZE_HORIZONTAL : return setCurrentSizeHorizontal(state, action.size)
		default                          : return state
	}

}
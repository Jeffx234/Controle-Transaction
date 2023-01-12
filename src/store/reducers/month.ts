import { SET_MONTH } from '../actions/months'

const initialState = {
  month: 'january',
}

export default function month(state = initialState, action) {
  switch (action.type) {
    case SET_MONTH:
      return {
        ...state,
        month: action.payload,
      }
    default:
      return state
  }
}

import {
  SET_USER,
  SET_USER_ERROR,
  SET_USER_ERROR_MESSAGE,
  SET_USER_LOADING,
  SET_USER_SUCCESS,
  SET_USER_SUCCESS_MESSAGE,
  USER_LOGOUT,
} from '../actions/users'

const initialState = {
  user: [],
  token: '',
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }

    case USER_LOGOUT:
      return {
        ...state,
        user: [],
        token: '',
      }

    case SET_USER_ERROR:
      return {
        ...state,
        isError: action.payload,
      }
    case SET_USER_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      }
    case SET_USER_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case SET_USER_SUCCESS:
      return {
        ...state,
        isSuccess: action.payload,
      }
    case SET_USER_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: action.payload,
      }
    default:
      return state
  }
}

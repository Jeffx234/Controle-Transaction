export const SET_USER = 'SET_USER'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_USER_LOADING = 'SET_USER_LOADING'
export const SET_USER_ERROR = 'SET_USER_ERROR'
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS'
export const SET_USER_ERROR_MESSAGE = 'SET_USER_ERROR_MESSAGE'
export const SET_USER_SUCCESS_MESSAGE = 'SET_USER_SUCCESS_MESSAGE'

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
})

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: null,
})

export const setUserLoading = (isLoading) => ({
  type: SET_USER_LOADING,
  payload: isLoading,
})

export const setUserError = (isError) => ({
  type: SET_USER_ERROR,
  payload: isError,
})

export const setUserSuccess = (isSuccess) => ({
  type: SET_USER_SUCCESS,
  payload: isSuccess,
})

export const setUserErrorMessage = (errorMessage) => ({
  type: SET_USER_ERROR_MESSAGE,
  payload: errorMessage,
})

export const setUserSuccessMessage = (successMessage) => ({
  type: SET_USER_SUCCESS_MESSAGE,
  payload: successMessage,
})

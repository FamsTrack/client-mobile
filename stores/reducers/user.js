const initialState = {
  loading: false,
  error: '',
  access_token: ''
}

export function userReducer (state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        access_token: action.payload,
        loading: false
      }
    case 'LOGOUT':
      return {
        ...state,
        access_token: ''
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

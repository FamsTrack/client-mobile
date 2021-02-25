const initialState = {
  loading: false,
  error: '',
  isLoggedIn: true,
  token: '',
  role: ''
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
        isLoggedIn: true,
        loading: false,
        error: false,
        role: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        error: false
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        error: action.payload
      }
    case 'LOGOUT_FAILED':
      return {
        ...state,
        error: action.payload
      }
    case 'STORE_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state
  }
}

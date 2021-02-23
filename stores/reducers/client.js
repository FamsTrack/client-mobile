const initialState = {
  clients: [],
  loading: false,
  error: '',
  client: {}
}

export function clientReducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CLIENTS_START':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_CLIENTS':
      return {
        ...state,
        clients: action.payload,
        loading: false
      }
    case 'FETCH_A_CLIENT':
      return {
        ...state,
        client: action.payload,
        loading: false
      }
    case 'FETCH_CLIENT_FAILED':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

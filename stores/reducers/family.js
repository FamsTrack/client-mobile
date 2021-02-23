const initialState = {
  families: [],
  loading: false,
  error: '',
  family: {}
}

export function familyReducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_FAMILIES_START':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_FAMILIES':
      return {
        ...state,
        families: action.payload,
        loading: false
      }
    case 'FETCH_A_FAMILY':
      return {
        ...state,
        family: action.payload,
        loading: false
      }
    case 'FETCH_FAMILIES_FAILED':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

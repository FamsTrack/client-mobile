const initialState = {
  loading: false,
  error: '',
  news: []
}

export function newsReducer (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_NEWS_START':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_NEWS_SUCCESS':
      return {
        ...state,
        news: action.payload,
        loading: false,
        error: false
      }
    case 'FETCH_NEWS_FAILED':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

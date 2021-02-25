const initialState = {
  families: [],
  loading: false,
  error: '',
  family: {},
  clients: [],
  schedules: [],
  buzzerStatus: false
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
        family: action.payload
      }
    case 'ADD_CLIENTS':
      return {
        ...state,
        clients: action.payload
      }
    case 'UPDATE_LOCATION':
      return {
        ...state,
        clients: action.payload
      }
    case 'ADD_SCHEDULES':
      return {
        ...state,
        schedules: action.payload,
        loading: false,
        error: ''
      }
    case 'FETCH_FAMILIES_FAILED':
      return {
        ...state,
        error: action.payload
      }
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
    case 'BUZZER_SUCCESS':
      return {
        ...state,
        loading: false,
        buzzerStatus: true
      }
    default:
      return state
  }
}

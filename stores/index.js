import { createStore, combineReducers, applyMiddleware } from 'redux'
import { clientReducer } from './reducers/client'
import { userReducer } from './reducers/user'
import { familyReducer } from './reducers/family'
import { newsReducer } from './reducers/news'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  user: userReducer,
  family: familyReducer,
  news: newsReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

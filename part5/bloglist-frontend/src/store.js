import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import creatorsReducer from './reducers/creatorsReducer'

const reducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  creators: creatorsReducer
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
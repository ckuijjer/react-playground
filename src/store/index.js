import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

const store = createStore(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store

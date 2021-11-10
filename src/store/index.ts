import { applyMiddleware, compose, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'

import reducer from './rootReducer'

/*eslint-disable */
export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
/* eslint-enable */

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk))

const store = createStore(reducer, enhancer)

export default store

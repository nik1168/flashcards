import {applyMiddleware, compose, createStore} from 'redux'
import {logger} from 'redux-logger'
import decks from '../reducers/index'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create the store
 * @param preloadedState
 */
const configureStore = preloadedState => createStore(
  decks,
  preloadedState,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

export default configureStore
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

/**
 * @function
 * @description Configures Redux store depending on the environment and applies middlewares and enhancers.
 *
 * @param {object} initialState The initial state value to populate the store with.
 */
export default (initialState) => {
	const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

	const enhancer = composeEnhancers(applyMiddleware(thunk));
	const store = createStore(rootReducer, initialState, enhancer);

	return store;
};

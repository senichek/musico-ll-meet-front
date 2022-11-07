import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import auth from '../middleware/authentification';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(auth),
);

//const store = createStore(reducer, enhancers);
const store = createStore(reducer, enhancers);

export default store;
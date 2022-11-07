import { combineReducers } from 'redux';

import eventReducer from '../reducers/event';
import userReducer from '../reducers/user';

const rootReducer = combineReducers({
    events: eventReducer,
    user: userReducer,
});

export default rootReducer;
import events from '../data/events.json';

export const initialState = {
    events: events,
};
  
const eventReducer = (state = initialState, action = {}) => {
    switch (action.type) {
    default:
        return state;
    }
};
  
export default eventReducer;
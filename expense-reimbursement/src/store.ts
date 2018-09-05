import {Store, createStore, combineReducers} from 'redux';
import {newTicketReducer} from './components/data-components/new-ticket/new-ticket-reducer';

const state = combineReducers({
    newTicketReducer
})

export const store: Store = createStore(state)
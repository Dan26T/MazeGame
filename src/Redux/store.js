import {combineReducers, createStore} from 'redux'
import gameReducer from './gameReducer'

let reducers = combineReducers({
    gamePage: gameReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
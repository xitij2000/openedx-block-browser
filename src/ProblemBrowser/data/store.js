import {applyMiddleware, createStore, compose} from 'redux';
import data from '../../data.json';
import thunkMiddleware from 'redux-thunk';
import {setCourseBlocks} from "./actions/courseBlocks";

import rootReducer from './reducers/index';

const defaultState = {
    rawBlocks: {},
    blocks: [],
    selectedBlock: null,
    rootBlock: null,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = initialState => createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware)),

);


const store = configureStore(defaultState);

store.dispatch(setCourseBlocks(data));

export default store;

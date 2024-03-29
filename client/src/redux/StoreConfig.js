import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducers from './reducers/authReducers';
import snackbarReducers from './reducers/snackbarReducer';
import courseReducer from './reducers/courseReducer';



export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
           auth:authReducers,
           snackbar:snackbarReducers,
           course:courseReducer
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
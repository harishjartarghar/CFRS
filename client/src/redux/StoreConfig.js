import {createStore, combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import authReducers from './reducers/authReducers';
import snackbarReducers from './reducers/snackbarReducer';



export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
           auth:authReducers,
           snackbar:snackbarReducers
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
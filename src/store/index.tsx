import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer, { IRootState } from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import errorMiddleware from '../config/error-middleware';
import notificationMiddleware from '../config/notification-middleware';
import loggerMiddleware from '../config/logger-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

const defaultMiddlewares = [
    thunkMiddleware,
    errorMiddleware,
    notificationMiddleware,
    promiseMiddleware,
    loadingBarMiddleware(),
    loggerMiddleware
];

const composedMiddlewares = middlewares => compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(rootReducer, initialState, composedMiddlewares(middlewares));

export default initialize;
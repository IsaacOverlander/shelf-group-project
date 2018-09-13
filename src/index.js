import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './redux/reducers';

import App from './App';
import rootSaga from './redux/sagas';
import {takeEvery , call , put } from 'redux-saga/effects'

function* rootSaga(){

yield takeEvery('FETCH_SHELF', getShelfSaga);

}


function* getShelfSaga(action){
  try{
    const shelfResponse = yield call(axios.get, '/api/shelf')

    const responseAction = {type:'SET_SHELF' , payload: shelfResponse.data };
    yield put(responseAction);
  }
  catch(error){
    console.log('ERROR IN - getShelfSaga(); - index.js', error);
    alert('unable to retrieve data');
  }
}








// Initializing to an empty object, but here is where you could
// preload your redux state with initial values (from localStorage, perhaps)
const preloadedState = {};
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}



//Store 
const store = createStore(
  reducer,
  preloadedState,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-root'),
);

import {put , call , takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchShelf(){
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
  
  function* shelfSaga() {
    yield takeLatest('FETCH_SHELF', fetchShelf);
  }
  

  export default shelfSaga;
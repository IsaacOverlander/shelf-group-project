import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* fetchShelf() {
  try {
    const shelfResponse = yield call(axios.get, '/api/shelf')

    const responseAction = { type: 'SET_SHELF', payload: shelfResponse.data };
    yield put(responseAction);
  }
  catch (error) {
    console.log('ERROR IN - getShelfSaga(); - index.js', error);
    alert('unable to retrieve data');
  }
}

function* deleteItem(action) {
  try {

    yield call(axios.delete, `/api/shelf/?id=${action.payload}`);
    yield put({ type: 'FETCH_SHELF' });

  }
  catch (error) {
    console.log('error in delete shelf saga', error);
    alert('unable to delete')
  }
}

function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
  yield takeLatest('DELETE_ITEM', deleteItem)
}


export default shelfSaga;
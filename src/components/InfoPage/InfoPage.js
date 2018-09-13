import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShelfForm from './ShelfForm/ShelfForm.js';
// import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  shelf: state.shelf,
});

class InfoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemToDelete: '',
    }

  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getShelf();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  deleteItem = (id) => {
    this.props.dispatch({ type: 'DELETE_ITEM', payload: id })

  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      itemToDelete: event.target.value,
    });
  }

  getShelf() {

    this.props.dispatch({ type: 'FETCH_SHELF' })
    // axios({
    //   method: 'GET',
    //   url: '/api/shelf'
    // }).then((response) => {
    //   const action = { type: 'SET_SHELF', payload: response.data }
    //   this.props.dispatch(action)

    // });
  }

//   function* rootSaga() {
//     // step 8 takeEvery will listen for specific actions
//     // when we get an action of type 'FETCH_BASKET', call getBasketSaga
//     // first param of takeEvery takes an action.type
//     yield takeEvery('FETCH_BASKET', getBasketSaga);
//     // when we dispatch 'ADD_BASKET_ITEM' , call postBasketSaga
//     yield takeEvery('ADD_BASKET_ITEM', postBasketSaga);

// }
//  // add basket item and then call FETCH_BASKET
// function* postBasketSaga(action) {
//     try {
//         // post to /fruit with data of action.payload
//         yield call(axios.post, '/fruit', action.payload);
//         // put dispatches an action
//         yield put({ type: 'FETCH_BASKET' });
//     } catch (error) {
//         console.log(error);
//         alert('unable to add item');
//     }
// }

// // step 6 create individual sagas
// function* getBasketSaga(action) {
//     // similar to reducers sagas will get an action
//     console.log('get basket saga with action: ', action);
//     try {
//         // step 12 making http req to server
//         const basketResponse = yield call(axios.get, '/fruit');
//         // basketResponse is our response from server
//         // step 13 dispatch an action and send to redux
//         const responseAction = { type: 'SET_BASKET', payload: basketResponse.data };
//         yield put(responseAction);
//     } catch (error) {
//         // notify user something went wrong
//         alert('unable to get basket');
//         console.log(error);
//     }
// }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <ShelfForm />
          <br />
          <br />
          Shelf Items:
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.shelf.shelfReducer.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.username}</td>
                    <td>{item.description}</td>
                    <td> <img src={item.image_url} alt={item.description}/></td>
                    <td><button onClick={() => this.deleteItem(item.id)}>Delete</button></td>
                  </tr>
                )
              })}

            </tbody>

          </table>

          
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);

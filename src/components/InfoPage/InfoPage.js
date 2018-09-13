import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShelfForm from './ShelfForm/ShelfForm.js';
import axios from 'axios';

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
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
    this.getShelf();
  }

  deleteItem = (id) => {
    axios({
      method: 'DELETE',
      url: '/api/shelf/'+ id
    }).then((response)=>{
      this.getShelf();
    })

  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      itemToDelete: event.target.value,
    });
  }

  getShelf() {
    axios({
      method: 'GET',
      url: '/api/shelf'
    }).then((response) => {
      const action = { type: 'SET_SHELF', payload: response.data }
      this.props.dispatch(action)

    });
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>Shelf Items:
          <br />
          <br />
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
              {JSON.stringify(this.props)}
              {this.props.shelf.shelfReducer.map((item) => {
                return (
                  <tr>
                    <td key={item.id}>{item.username}</td>
                    <td key={item.id}>{item.description}</td>
                    <td key={item.id}> <img src={item.image_url} /></td>
                    <td><button onClick={() => this.deleteItem(item.id)}>Delete</button></td>
                  </tr>
                )
              })}

            </tbody>

          </table>

          <ShelfForm />
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

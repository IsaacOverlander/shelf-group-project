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
  }

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

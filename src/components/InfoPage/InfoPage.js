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
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getShelf() {
    axios({
      method: 'GET',
      url: '/api/shelf' 
    }).then((response) => {
      const action  = {type: 'SET_SHELF', payload: response.data}
      this.props.dispatch(action)
      // setstate replaced by dispatch
      // this.setState({
      //   ...this.state,
      //   todos: response.data,
      // });
    });
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>Shelf Items:
          <br/>
          <br/>
          <table>
            <thead>
              <th>Description</th>
              <th>Image</th>
            </thead>
            <tbody>
             
                {this.props.shelf.shelfReducer.map((item) =>{
                  return(
                    <tr>
                    <td key={item.id}>{item.description}</td>
                    <td key={item.id}>{item.image_url}</td>
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
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);

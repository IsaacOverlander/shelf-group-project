import React, { Component } from 'react';
import { connect } from 'react-redux';
import ShelfForm from './ShelfForm/ShelfForm.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
    // this.getById();
    this.props.dispatch({ type: 'BY_ID', payload: this.props.match.params.id })
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



  getById = () => {
    //  const id = this.props.user.id
    this.setState({
      id: this.props.user.id,
    })
    console.log('in getById, user id: ', this.state.id)
    this.props.dispatch({ type: 'BY_ID', payload: this.state.id })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>{JSON.stringify(this.props.match.params.id)}</p>
          <ShelfForm />
          <br />
          <br />
          Shelf Items:
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.shelf.shelfReducer.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.username}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell> <img src={item.image_url} alt={item.description} height="100px" /></TableCell>
                      <TableCell><button onClick={() => this.deleteItem(item.id)}>Delete</button></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
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

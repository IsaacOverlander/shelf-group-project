import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const mapStateToProps = state => ({
    shelf: state.shelf
})

class ViewPage extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SHELF' });
    }

    handleLoginChange() {
        this.props.history.push('home');
    }
    handleRegisterChange() {
        this.props.history.push('register');
    }


    render() {
        return (
            <div>

                Shelf Items:
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>User Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.shelf.shelfReducer.map((item) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell >{item.username}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell> <img src={item.image_url} alt={item.description} height="100px" /></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <div>

                    <p>Log in:</p>
                    <span>
                        <Button className="viewbutton"
                         onClick={this.handleLoginChange}
                         color="primary">
                            Home
                    </Button>
                    </span>

                    <br />

                    <span>
                        <p>Not a user ?
                         <br />
                            Sign up today!</p>
                        <Button className="viewbutton"
                         onClick={this.handleRegisterChange}
                         color="primary"
                         >
                            Registration
                    </Button>
                    </span>

                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ViewPage);
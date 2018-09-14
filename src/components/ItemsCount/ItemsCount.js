import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const mapStateToProps = state => ({
    shelf: state.shelf,
});

class ItemsCount extends Component {
    componentDidMount() {
        this.getCount();
    }

    getCount = () => {
        axios({
            method: 'GET',
            url: '/api/shelf/count'
        }).then((results) => {
            const action = { type: 'SET_SHELF', payload: results.data };
            this.props.dispatch(action);
        }).catch((error) => {
            console.log('Error getting count', error);
        })
    }
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Number of items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.shelf.shelfReducer.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}
export default connect(mapStateToProps)(ItemsCount); 
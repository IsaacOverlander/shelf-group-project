import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const mapStateToProps = state => ({
    shelf: state.shelf
})

class ViewPage extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SHELF'});
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
                                        <TableCell> <img src={item.image_url} alt={item.description} height="100px"/></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ViewPage);
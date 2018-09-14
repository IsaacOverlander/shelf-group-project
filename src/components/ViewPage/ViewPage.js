import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
    shelf: state.shelf
})


class ViewPage extends Component {

    componentDidMount() {
        this.getShelf();
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
        return (
            <div>
                Shelf Items:
            <table>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.shelf.shelfReducer.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td >{item.username}</td>
                                    <td>{item.description}</td>
                                    <td> <img src={item.image_url} alt={item.description} /></td>
                                </tr>
                            )
                        })}

                    </tbody>

                </table>


            </div>
        )
    }
}

export default connect(mapStateToProps)(ViewPage);
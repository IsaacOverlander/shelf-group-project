import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const mapStateToProps = reduxState => ({
    reduxState
})

class ShelfForm extends Component {
    
    constructor() {
        super();
        this.state = {
            description: '',
            image_url: '',
        }
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
        });
    }
    


    handleSubmit = (event) => {
        event.preventDefault();
            this.props.dispatch({type: 'ADD_ITEM', payload: this.state});
    };

    render() {
        return (
            <div>
                <form id="shelf-form" onSubmit={this.handleSubmit}>

                    <InputLabel>Description:</InputLabel>
                    <Input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <br />
                    <InputLabel>Image:</InputLabel>
                    <Input type="text" name="image_url" value={this.state.image_url} onChange={this.handleChange} />
                    <Button className="float-right" variant="contained" color="primary" type="submit">Add Item</Button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ShelfForm);
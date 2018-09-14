import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactFilestack from 'filestack-react'; 
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const mapStateToProps = reduxState => ({
    reduxState
})
const options = {
    accept: 'image/*',
    maxFiles: 1,
    storeTo: {
      location: 's3',
    },
  };

class ShelfForm extends Component {
    
    constructor() {
        super();
        this.state = {
            description: '',
            image_url: '',
        }
    }
    getImageURL = (result) => {
        console.log('filestack submitted', result.filesUploaded);
        this.setState({
            ...this.state,
            image_url: result.filesUploaded[0].url 
        })
        console.log(this.state.image_url); 
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
                    <ReactFilestack
                            apikey='ACGkY2eEqTDG52A5eOG3Az'
                            buttonText="Upload an Image"
                            options={options}
                            onSuccess={this.getImageURL}
                            />
                    <input type="submit" />
                    <Button className="float-right" variant="contained" color="primary" type="submit">Add Item</Button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ShelfForm);
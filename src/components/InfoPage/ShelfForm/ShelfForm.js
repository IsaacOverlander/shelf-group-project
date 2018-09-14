import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactFilestack from 'filestack-react'; 

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
    // ** FUNCTIONS ** 
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
        axios({
           method: 'POST',
           url: '/api/shelf',
           data: this.state 
        }).then((response) => {
            console.log('Item was added');
            // GET function goes here
        }).catch((error) => {
            console.log(error);
            alert('there was an error adding your item');
        });
    };

    // ** FUNCTIONS **
    render() {
        return (
            <div>
                {/* // ** FORM ** */}

                <form onSubmit={this.handleSubmit}>

                    <label>Description:</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    <br />
                    <label>Image:</label>
                    {/* <input type="text" name="image_url" value={this.state.image_url} onChange={this.handleChange} /> */}
                    <ReactFilestack
                            apikey='ACGkY2eEqTDG52A5eOG3Az'
                            buttonText="Upload an Image"
                            options={options}
                            onSuccess={this.getImageURL}
                            />
                    <input type="submit" />
                </form>


                {/* // ** FORM ** */}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ShelfForm);
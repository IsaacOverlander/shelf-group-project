import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState
})

class ShelfForm extends Component {
    // ** FUNCTIONS ** 
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
        const action = { type: 'SET_SHELF', payload: this.state }
        console.log(action);
        this.props.dispatch(action);
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
                    <input type="text" name="image_url" value={this.state.image_url} onChange={this.handleChange} />

                    <input type="submit" />
                </form>


                {/* // ** FORM ** */}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ShelfForm);
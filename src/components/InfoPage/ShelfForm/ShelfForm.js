import React, { Component } from 'react';

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
            [event.target.name]: evemt.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const action = { type: 'SET_SHELF', payload: this.state }
        console.log(action);
    };

    // ** FUNCTIONS **
    render() {
        return (
            <div>
                {/* // ** FORM ** */}

                <form onSubmit={this.handleSubmit}>

                    <label>Description:</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />

                    <label>Image:</label>
                    <input type="text" name="image_url" value={this.state.image_url} onChange={this.handleChange} />

                    <input type="submit" />
                </form>


                {/* // ** FORM ** */}
            </div>
        )
    }
}

export default ShelfForm;
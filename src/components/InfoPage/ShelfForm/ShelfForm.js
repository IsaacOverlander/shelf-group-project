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
        const action = {type: 'SET_SHELF', payload: this.state}
        console.log(action);
    };

    // ** FUNCTIONS **
    render() {
        return (
            <div>Hello World</div>
            // ** FORM **

            // ** FORM **
        )
    }
}

export default ShelfForm;
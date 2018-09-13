import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios'; 

const mapStateToProps = reduxState => ({
    reduxState,
});

class ItemsCount extends Component {
    componentDidMount() {
        // const action = {};
        // this.props.dispatch(action); 
    }

    getCount = () => {
        axios({
            method: 'GET',
            url: '/api/shelf/count'
        }).then((results) => {
            const action = {type: 'SET_SHELF', payload: results.data};
            this.props.dispatch(action); 
        }).catch((error) => {
            console.log('Error getting count', error); 
        })
    }
    render(){
        return(
            <ul>
                {this.props.reduxState.shelfReducer.map((item) => {
                    return (
                        <li>{item.username}: {item.count}</li>
                        );
                    })}  
                </ul>
        );
    }
}
export default connect(mapStateToProps)(ItemsCount); 
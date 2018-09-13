import React, {Component} from 'react'; 
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
    reduxState,
});

class ItemsCount extends Component {
    componentDidMount() {
        const action = {};
        this.props.dispatch(action); 
    }

    render(){
        return(
            <ul>
                <li>

                </li>
            </ul>
        );
    }
}
export default ItemsCount; 
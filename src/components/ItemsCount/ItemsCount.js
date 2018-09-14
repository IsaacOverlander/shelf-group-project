import React, {Component} from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
    shelf: state.shelf,
});

class ItemsCount extends Component {
    componentDidMount() {
       this.getCount();
    }
  ;
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
                {/* {JSON.stringify(this.props.shelf)} */}
                {this.props.shelf.shelfReducer.map((item, i) => {
                    return (
                        <div>
                            <li key={i}>{item.username}: {item.count}</li>
                            <br/>
                        </div>
                        );
                    })}  
                </ul>
        );
    }
}
export default connect(mapStateToProps)(ItemsCount); 
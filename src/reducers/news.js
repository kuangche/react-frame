import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/actionTypes';

const initialState = [];
const news = handleActions({
    [actionTypes.NEWS_LIST_GET]: (state,action) =>{
        return {
            data : action.payload
        }
    }
},initialState);

/*const news = (state = initialState, action) => {
    const { type ,data} = action
    switch (type) {
        case 'NEWS_LIST_GET':
            return data
        default:
            return state;
    }
};*/

export default news;

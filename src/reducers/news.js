import { handleActions } from '../common';
import Immutable from 'immutable';
import * as actionTypes from '../actions/actionTypes';

const initialState = Immutable.fromJS({
    isLoading: false,
    list: []
});
const news = handleActions({
    [actionTypes.NEWS_LIST_GET]:{
        pre: state => {
            return {
                ...state,
                isLoading: true
            }
        },
        success: (state, action) => {
            debugger;
            return action.payload
        }
    }
},initialState);

export default news;

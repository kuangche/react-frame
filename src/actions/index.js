import axios from 'axios';
import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const setNews =  createAction(actionTypes.NEWS_LIST_GET, data => data)

export const getNewsList = (params) => (dispatch) => {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
        .then(result => {
            dispatch( setNews( result.data))
        })
        .catch(error => {
            debugger;
        })
}

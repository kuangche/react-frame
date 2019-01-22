import axios from 'axios';
import { createActions } from 'redux-actions';
import * as actionTypes from './actionTypes';

export default createActions({
    [actionTypes.NEWS_LIST_GET]: () => {
        return axios.get(`https://www.reddit.com/r/reactjs.json`)
            .then(result => {
                return result.data
            })
            .catch(error => {
                debugger;
            })
    },
    [actionTypes.NEWS_LIST_DEL]: () => {
        debugger;
    }
})

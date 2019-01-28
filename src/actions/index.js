import axios from 'axios';
import { createAction, createActions } from '../common';
import * as actionTypes from './actionTypes';

// createAction 会返回一个 FSA 规范的 action，该 action 会是一个对象，而不是一个 function
const setNews =  createAction(actionTypes.NEWS_LIST_GET)
//same as  const setNews =  createAction(actionTypes.NEWS_LIST_GET data => data)

/*export const getNewsList = (params) => (dispatch) => {
    axios.get(`https://www.reddit.com/r/reactjs.json`)
        .then(result => {
            dispatch( setNews(result.data))
        })
        .catch(error => {
            debugger;
        })
}*/

const actionCreator = createActions({
    getNewsList : {
        url: 'https://www.reddit.com/r/reactjs.json',
        method: 'get',
        handleError: true,
        actionType: actionTypes.NEWS_LIST_GET
    },
    setNews : createAction(actionTypes.NEWS_LIST_GET)
})
export default actionCreator;

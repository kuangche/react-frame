export const getNews = ( params )=> dispatch => {
    return dispatch(feat(params))
}
const feat = () => dispatch => {
    return fetch(`https://www.reddit.com/r/reactjs.json`)
        .then(response => {
            return response.json()
        })
        .then(json => {
            dispatch({
                type: 'SET_NEWS',
                data: json
            })
        })
}

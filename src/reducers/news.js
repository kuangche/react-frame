const initialState = [];
const news = (state = initialState, action) => {
    const { type ,data} = action
    switch (type) {
        case 'SET_NEWS':
            return data
        default:
            return state;
    }
};

export default news;

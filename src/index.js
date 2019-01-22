import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware  } from 'redux';
import reducers from './reducers';
import './scss/main.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
const store = createStore(
    reducers,
    applyMiddleware(...middleware )
);
render(
    <Provider store = { store }>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

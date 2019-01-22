import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from './images/logo.svg';
import { getNews } from './actions'

class MyApp extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.news === nextProps.news){
            return false
        }else{
            return true;
        }

    }
  render() {
    const {news, getNews} = this.props;
    return (
      <div className="App">
        news:{ news.length === 0 ? 'null': JSON.stringify(news)}
        <header className="App-header" onClick={ () => getNews(parseInt(Math.random()*100))}>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      news : state.news
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNews : bindActionCreators(getNews,dispatch)
    }
}
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyApp)
export default App;

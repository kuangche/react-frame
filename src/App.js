import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './images/logo.svg';
import actionCreator from './actions'
import {DatePicker, message} from 'antd';
import 'antd/dist/antd.css';

import TestComponent from './components/TestComponent'

class MyApp extends Component {
    constructor(props) {
        super(props);
        //this.handleClick = this.handleClick.bind(this); //构造函数中绑定
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.news === nextProps.news){
            return false
        }else{
            return true;
        }
    }

    handleClick(data){
        alert(JSON.stringify(data))
    }

    dateChange(date){
        message.info(`您选择的日期是: ${date.format('YYYY-MM-DD')}`);
    }
  render() {
    const {news, getNewsList} = this.props;
    return (
      <div className="App">
          <TestComponent
              change = {this.dateChange}
          />
        news:{ news.length === 0 ? 'null': JSON.stringify(news)}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={ () => getNewsList(parseInt(Math.random()*100))}/>
          <p onClick={this.handleClick}>
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
const App = connect(
    mapStateToProps,
    actionCreator
)(MyApp)
export default App;

import React, { Component } from 'react';
import './App.css';


import HomeTest from './HomeTest.js'
import TimerTest from './TimerTest.js'

class App extends Component {
  render() {
    return(
      <div>
        <TimerTest time={[0, 4]}/>
      </div>
    )
  }
}

export default App;

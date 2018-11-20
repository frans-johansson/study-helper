import React, { Component } from 'react';
import './App.css';


import HomeTest from './Tests/HomeTest.js'
import TimerTest from './Tests/TimerTest.js'
import MountainTest from './Tests/MountainTest.js'

class App extends Component {
  render() {
    return(
      <div>
      	<MountainTest />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';


import HomeTest from './Tests/HomeTest.js'
import TimerTest from './Tests/TimerTest.js'
import MountainTest from './Tests/MountainTest.js'
import SetTimerTest from './SetTimerTest.js'

class App extends Component {
  render() {
    return(
      <div>
      	<SetTimerTest />
      </div>
    )
  }
}

export default App;

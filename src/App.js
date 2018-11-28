import React, { Component } from 'react';
import './_css/test.css';

import Hubtest from './Tests/Hubtest.js'
import HomeTest from './Tests/HomeTest.js'
import TimerTest from './Tests/TimerTest.js'
import MountainTest from './Tests/MountainTest.js'
import SetTimerTest from './SetTimerTest.js'

class App extends Component {
  render() {
    return(
      <div>
      	<SetTimerTest />
      	<HomeTest />
      </div>
    )
  }
}

export default App;

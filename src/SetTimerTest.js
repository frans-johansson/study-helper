import React, { Component } from 'react';
import './App.css';

import TimerTest from './Tests/TimerTest.js'
import SetTimerIntervall from './SetTimerIntervall.js'

class SetTimerTest extends Component {

	constructor(props) {
		super(props);

		this.setTimeState = this.setTimeState.bind(this);

			//Initialize 
		this.state={
			timeInput: [0,45]
		}
	}

	setTimeState(value) {
		let formattedTime= [0, value];

		this.setState({timeInput: formattedTime});

		console.log("in setTimeState" + formattedTime);
	}

	
  render() {
    return(
      <div>
      	<SetTimerIntervall defaultTime={45} setTimeState={this.setTimeState} />

      	<TimerTest time={this.state.timeInput}/>
      </div>
    )
  }
}

export default SetTimerTest;
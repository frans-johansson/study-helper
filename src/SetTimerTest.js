import React, { Component } from 'react';
import './App.css';

import TimerTest from './Tests/TimerTest.js'
import SetTimerIntervall from './SetTimerIntervall.js'
//let isPause = false;


class SetTimerTest extends Component {

	constructor(props) {
		super(props);

		this.setTimeState = this.setTimeState.bind(this);
		this.setPauseState = this.setPauseState.bind(this);
		//this.setPauseTime = this.setPauseTime.bind(this);

			//Initialize 
		this.state={
			timeInput: [0,45],
			pauseInput: [0,15],
			//sendTime: this.state.timeInput
			}
	}

	setTimeState(hours, minutes) {
		let formattedTime = [hours, minutes];

		this.setState({timeInput: formattedTime});

	}

	setPauseState(hoursp, minutesp){
		let formattedTimep = [hoursp, minutesp];

		this.setState({pauseInput: formattedTimep});
		console.log("in setPauseState" + formattedTimep);
	}


	//setPauseTime(){
	//	if(isPause){
	//		this.setState({sendTime: this.state.timeInput});
	//		isPause = false;
	//	}else{
	//		this.setState({sendTime: this.state.pauseInput});
	//		isPause = true;			
	//	}
	//}



  render() {
    return(
      <div>
      	<SetTimerIntervall defaultTimeH={0} defaultTimeMin={45} defaultTimePauseH={0} defaultTimePauseMin={15} 
      		setTimeState={this.setTimeState} setPauseState={this.setPauseState} />

      	<TimerTest time={this.state.timeInput} pauseTime = {this.state.pauseInput} />
      </div>
    )
  }
}

export default SetTimerTest;
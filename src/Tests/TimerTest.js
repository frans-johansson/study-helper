import React, { Component } from 'react'

import Button from "../Components/Button.js"
import setPauseTime from "../SetTimerTest.js"

let isTicking = false;
let isPause = false;

let tickCounter = 0;



function formatTimeFromUser([hours, minutes]) {
	console.log("format" + hours*60*60 + minutes*60);
	return hours*60*60 + minutes*60
}

function formatTimeToUser(seconds) {
	let date = new Date(null)
	date.setSeconds(seconds)

	return date.toISOString().substr(11, 8)
}

function pausePlay() {
	if(isTicking === true){
		isTicking = false
	}
	else{
		isTicking = true
	}
}

class Timer extends Component {


	constructor(props) {
		super(props)

		this.state = {
			time: props.time,
			pauseTime: props.pauseTime
		}
		console.log("in constructor " + this.state.time);
		this.timer = setInterval(this.tickDown.bind(this), 1000)
	}


	tickDown() {
		if (tickCounter == 0) {
			this.setState({
				time: this.props.time,
				pauseTime: this.props.pauseTime
				})
		}

		tickCounter ++;
					
		if(isTicking === true){
			this.setState({
				time: this.state.time - 1
			})
		}

		if (this.state.time <= 0) {
			if(isPause) {
				this.setState({
				time: this.props.time,
				pauseTime: this.props.pauseTime
				})

				isPause = true;
			}
			else {
				this.setState({
				time: this.props.pauseTime,
				pauseTime: this.props.time
				})

				isPause = false;
			}
			
		}

		
	}

	render() {	

		if (!isTicking) {
			tickCounter = 0
			isTicking = true
		}
		

		return(
			<p>
				{formatTimeToUser(this.state.time)}
			</p>
		)
	}
}

class TimerTest extends Component {

	constructor(props) {
		super(props);
	}

	

	render() {
		return(
			<div>
				<Timer time={formatTimeFromUser(this.props.time)}  pauseTime={formatTimeFromUser(this.props.pauseTime)}/>
				<Button onClick={() => pausePlay()} text="Plugg"/>
				
			</div>	
		)
	}
}

export default TimerTest
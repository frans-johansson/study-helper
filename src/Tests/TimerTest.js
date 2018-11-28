import React, { Component } from 'react'

import Button from "../Components/Button.js"

let a=false;

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
	if(a === true){
		a = false
	}
	else{
		a = true
	}
}

class Timer extends Component {


	constructor(props) {
		super(props)

		this.state = {
			time: props.time
		}
		console.log("in constructor " + this.state.time);
		this.timer = setInterval(this.tickDown.bind(this), 1000)
	}
	componentDidMount() {
		console.log("in componentDidMount " + this.state.time);
	}



	tickDown() {
		if (tickCounter == 0) {
		this.setState({
			time: this.props.time
		})

	}
	tickCounter ++;
	console.log("In tickDown: tickCounter = "  + tickCounter);
		
		if(a===true){
		this.setState({
			time: this.state.time - 1
		})
	}
	console.log("In tickDown: "  + this.state.time);

		if (this.state.time <= 0) {
			clearInterval(this.timer)
		}
	}


	render() {
{
	if (!a) {
		tickCounter = 0;
	}
	
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
				<Timer time={formatTimeFromUser(this.props.time)}/>
			<Button onClick={() => pausePlay()} text="Pausa"/>
			</div>	
		)
	}
}

export default TimerTest
import React, { Component } from 'react'

import Button from "./Button.js"

let a=true;

function formatTimeFromUser([hours, minutes]) {
	return hours*60*60 + minutes*60
}

function formatTimeToUser(seconds) {
	let date = new Date(null)
	date.setSeconds(seconds)

	return date.toISOString().substr(11, 8)
}

function pausePlay() {
	if(a == true){
		a = false
	}
	else{
		a = true
	}
	
}


class Timer extends Component {


	constructor(props) {
		super()

		this.state = {
			time: props.time
		}

		this.timer = setInterval(this.tickDown.bind(this), 1000)
	}

	tickDown() {

		if(a==true){
		this.setState({
			time: this.state.time - 1
		})
	}

		if (this.state.time <= 0) {
			clearInterval(this.timer)
		}
	}



	render() {
		return(
			<p>{formatTimeToUser(this.state.time)}</p>
		)
	}
}

class TimerTest extends Component {
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
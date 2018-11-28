import React, { Component } from 'react'

import Button from "../Components/Button.js"

let isTicking = false;
let isPause = false;

let tickCounter = 0;

function formatTimeFromUser([hours, minutes]) {
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
			pauseTime: props.pauseTime,
        }
        
		this.timer = setInterval(this.tickDown.bind(this), 1000)
	}

	tickDown() {
        let {time, pauseTime} = this.props

		if (tickCounter == 0) {
			this.setState({
				time: time,
				pauseTime: pauseTime
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
				    time: time,
				    pauseTime: pauseTime
				})

				isPause = false;
			}
			else {
				this.setState({
				    time: pauseTime,
				    pauseTime: time
				})

				isPause = true;
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

class TimerContainer extends Component {
	constructor(props) {
        super(props);
        
        this.returnHome = this.returnHome.bind(this)
    }
    
    returnHome() {
        clearInterval(this.timer)
        setTimeout(this.props.setActiveView("home"), 1000)
    }

	render() {
        let {time, pauseTime} = this.props.viewProps

		return(
			<div>
				<Timer time={formatTimeFromUser(time)}  pauseTime={formatTimeFromUser(pauseTime)}/>
				<Button onClick={() => pausePlay()} text="Plugg"/>
                <Button onClick={() => {this.returnHome()}} text="Tillbaka"/>
			</div>	
		)
	}
}

export default TimerContainer
import React, { Component } from 'react'


import Button from "../Components/Button.js"

import ProgressBar from "../Components/ProgressBar.js"

let timer = undefined
let isTicking = false
let isPause = false

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
       
		timer = setInterval(this.tickDown.bind(this), 1000)
	}



	tickDown() {
        let {time, pauseTime} = this.props

		if (tickCounter == 0) {
			this.setState({
				time: time,
				pauseTime: pauseTime
			})
		}

		tickCounter++
					
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

				isPause = false
			}
			else {
				this.setState({
				    time: pauseTime,
				    pauseTime: time
				})

				isPause = true
			}	
		}
	}

	render() {	

		let next= "Nästa: Paus"
        let subject = "Analys"
        let totaltime = this.props.time

		if (!isTicking) {
			tickCounter = 0
			isTicking = true
		}
		
		if(isPause){
       		subject = "Paus" 
       		next = "Nästa: Analys"
       		totaltime = this.props.pauseTime
       		
       	}
       	let nowtime=totaltime-this.state.time

		return(
			<div>
					
					<h1> {subject} </h1>
					<p> {next} </p>

					<ProgressBar percentage= {nowtime} goal={totaltime}/>
			
					<p>
						{formatTimeToUser(this.state.time)}
					</p>
			</div>
		)

		nowtime= 0
		totaltime=0
	}
}

class TimerContainer extends Component {
	constructor(props) {
        super(props)
        
        this.returnHome = this.returnHome.bind(this)
    }
    
    returnHome() {
        clearInterval(timer)
        setTimeout(this.props.setActiveView("home"), 1000)
    }

	render() {
        let {time, pauseTime} = this.props.viewProps
       
       

       

		return(
			
				<div className="timer_page_collum_container">

				<div className="timer_box_container">
				<Timer time={formatTimeFromUser(time)}  pauseTime={formatTimeFromUser(pauseTime)}/>
				</div>	

				

				<div className="timer_box_container">
				<Button onClick={() => pausePlay()} text="Paus"/>
				 </div>	

				<div className="timer_box_container">
                <Button onClick={() => {this.returnHome()}} text="Tillbaka"/>
                 </div>	

                </div>	
				
		)
	}
}

export default TimerContainer
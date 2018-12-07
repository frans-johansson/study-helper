import React, { Component } from 'react'
import swal from '@sweetalert/with-react'


import Button from "../Components/Button.js"
import ProgressBar from "../Components/ProgressBar.js"
import {formatTimeFromUser, formatTimeToUser} from '../Utils'


let timer = undefined
let isTicking = false
let isPause = false

let tickCounter = 0;
let workSum = 0

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

			if (!isPause) {
				workSum++
			}
		}

		if (this.state.time <= 0) {
			isTicking = false;
			if(isPause) {
				swal({
					title: "Plugg",
					button: "Börja plugga",
				})
				.then((clicked) => {
						
					this.setState({
					    time: time,
					    pauseTime: pauseTime,
					})
					isPause = false	
					isTicking = true;

				})		
				
			}
			else {
				swal({
					title: "Rast",
					button: "Börja rasten"
					})
				.then((clicked) => {
						
					this.setState({
					    time: pauseTime,
					    pauseTime: time,
					  })
					isPause = true
					isTicking = true
				})		
 				
				
			}	
		}
	}

	render() {	

		let next= "Nästa: Rast"
        let subject = "Analys"
        let totaltime = this.props.time

		if (!isTicking) {
			tickCounter = 0
			isTicking = true
		}
		
		if(isPause){
       		subject = "Rast" 
       		next = `Nästa: ${this.props.mountain.name}`
       		totaltime = this.props.pauseTime
       		       		
       	}else{
       		subject = this.props.mountain.name
       		next = "Nästa: Rast"
       		totaltime = this.props.time
       	}

       	let nowtime=totaltime-this.state.time

       	let mountainColor = this.props.mountain.color

		return(
			<div className="page_container">
					
					<h1> {subject} </h1>
					<p> {next} </p>

					<ProgressBar percentage= {nowtime} goal={totaltime} mountain={mountainColor}/>
			
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
        this.props.viewProps.incrementStudied(this.props.viewProps.mountain.id, workSum)
        this.props.viewProps.updatePreviousDate(this.props.viewProps.mountain.id)
        this.props.viewProps.incrementWorkToday(workSum)
        this.props.setActiveView("home")
    }

	render() {
        let {time, pauseTime, mountain} = this.props.viewProps   

		return(
			
				<div className="timer_page_collum_container">

				<div className="timer_box_container">
					<Timer 	time={formatTimeFromUser(time)}
							pauseTime={formatTimeFromUser(pauseTime)}
							mountain={mountain}/>
				</div>	

				

				<div className="timer_box_container">
				<Button onClick={() => pausePlay()} text={"Paus"}/>
				 </div>	

				<div className="timer_box_container">
                <Button onClick={() => {this.returnHome()}} text="Tillbaka"/>
                 </div>	

                </div>	
				
		)
	}
}

export default TimerContainer
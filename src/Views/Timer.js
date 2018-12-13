import React, { Component } from 'react'
import swal from '@sweetalert/with-react'
import Sound from 'react-sound'
import soundFile from "../Sounds/Alarm-tone.mp3"

import Button from "../Components/Button.js"
import ProgressBar from "../Components/ProgressBar.js"
import {formatTimeFromUser, formatTimeToUser} from '../Utils'


let timer = undefined
let isTicking = true
let isPause = false

let pausePlayButton = "pauseButton"
let alarmStatus = Sound.status.STOPPED

let workSum = 0


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

				alarmStatus = Sound.status.PLAYING

				this.forceUpdate()

				swal({
					className: "swal_timer",
					title: "Dags att ta tag i pluggandet igen!",
					button: "Börja plugga",
				})
				.then((clicked) => {

					this.setState({
					    time: time,
					    pauseTime: pauseTime,
					})
					isPause = false
					isTicking = true;
					alarmStatus = Sound.status.STOPPED
				})

			}
			else {

				alarmStatus = Sound.status.PLAYING

				this.forceUpdate()

				swal({
					className: "swal_timer",
					title: "Bra pluggat! Nu är det dags för rast.",
					button: "Börja rasten"
					})
				.then((clicked) => {

					this.setState({
					    time: pauseTime,
					    pauseTime: time,
					  })
					isPause = true
					isTicking = true
					alarmStatus = Sound.status.STOPPED
				})

			}
		}
	}

	render() {

		let next= ""
        let subject = ""
        let totaltime = this.props.time

		if(isPause){
       		subject = "Rast"
       		next = `Nästa pass: ${this.props.mountain.name}`
       		totaltime = this.props.pauseTime

       	}else{
       		subject = "Du pluggar: " + this.props.mountain.name
       		next = "Nästa pass: Rast"
       		totaltime = this.props.time
       	}

       	let nowtime=totaltime-this.state.time

       	let mountainColor = this.props.mountain.color

       	let p= 100*nowtime/totaltime

		return(
			<div>
					<Sound url={`${soundFile}`} playStatus={`${alarmStatus}`} />
					<h1>{subject} </h1>
					<h1>
						{formatTimeToUser(this.state.time)}
					</h1>
					<ProgressBar percentage= {p} goal={totaltime} mountain={mountainColor}/>
					<h3> {next} </h3>
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
        this.pausePlay = this.pausePlay.bind(this)
    }

    returnHome() {
        clearInterval(timer)
        this.props.viewProps.incrementStudied(this.props.viewProps.mountain.id, workSum)
        this.props.viewProps.updatePreviousDate(this.props.viewProps.mountain.id)
        this.props.viewProps.incrementWorkToday(workSum)

        timer = undefined
		isTicking = true
		isPause = false
        workSum = 0
        pausePlayButton = "pauseButton"

        this.props.setActiveView("home")
    }

	pausePlay() {
		if(isTicking === true){
			isTicking = false
			pausePlayButton = "playButton"
		}
		else{
			isTicking = true
			pausePlayButton = "pauseButton"
		}

		this.forceUpdate()
	}

	render() {

        let {time, pauseTime, mountain} = this.props.viewProps

		return(
			<div className="view_container">
				<div className="timer_box">
					<Timer 	time={formatTimeFromUser(time)}
							pauseTime={formatTimeFromUser(pauseTime)}
							mountain={mountain}/>
				</div>


				<div className="timer_box">
					<Button onClick={() => {this.pausePlay()}} className={`${pausePlayButton}`} />
				</div>

				<div className="timer_box">
			    		<Button onClick={() => {this.returnHome()}} className="stopButton"/>

			    </div>
			</div>

		)
	}
}

export default TimerContainer

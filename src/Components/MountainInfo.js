import React, { Component } from 'react'
import { toHoursMinutes } from '../Utils'
import swal from '@sweetalert/with-react';
import Button from './Button.js'
import onClickOutside from 'react-onclickoutside'
import positionMarker from '../svg/position.svg'
import flag from '../svg/flag.svg'

class MountainInfo extends Component {
	constructor(props) {
		super(props)
		this.goHome = this.goHome.bind(this)
		this.deleteMountain = this.deleteMountain.bind(this)
		this.updateImageDimensions = this.updateImageDimensions.bind(this)

		this.state = {
			windowWidth: document.documentElement.clientWidth
		}

		let studied = this.props.subcomponentProps.highlightedMountain.studied
		let name = this.props.subcomponentProps.highlightedMountain.name

		let [hours, minutes] = toHoursMinutes(studied)

		this.studiedMessage = ''

		if (hours === 0 && minutes === 0)
			this.studiedMessage += ` 0 min`

		if (hours !== 0)
			this.studiedMessage += ` ${hours} h`
		if (minutes !== 0)
			this.studiedMessage += ` ${minutes} min`
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateImageDimensions)
	}

	deleteMountain() {
			swal({
				className: "swalEraseMountain",
				title: "Är du säker på att du vill radera berget?",
				icon: "warning",

				buttons:{
					cancel: "Nej",
					confirm: "JA",
				}
			})
			.then((clicked) => {
				if(clicked){
					this.props.subcomponentProps.removeMountain(this.props.subcomponentProps.highlightedMountain.id)
					this.goHome()
				}else{
					swal.close()
				}
			})
	}

	goHome() {
			this.props.clearSubcomponent()
			this.props.subcomponentProps.clearHighlightedMountain()
	}

	updateImageDimensions() {
		this.setState({
			windowWidth: window.innerWidth
		})
	}

	handleClickOutside = () => {
		this.goHome()
		console.log("here")
	}

	render() {
		let mountain = this.props.subcomponentProps.highlightedMountain
		let {goal, date, studied, color} = mountain

		let divStyle = {
	        left: 0,
	        bottom: 0,
	        width: 10,
	   		height: 10,
	    }

	    let {windowWidth} = this.state
	    let imageElementWidth = windowWidth * 0.70;
	    let imageHeight = {
	    	height: `${imageElementWidth * (703.38/595.38)}px`,
	    }
        				// Denna länk: https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91

		if(studied>0){
			if (studied >= goal)
			{
				divStyle = {
					left: `48%`,
					bottom: `99%` ,
					//backgroundImage: 'url(/static/media/position.4f7a9f24.svg)',
					backgroundImage: `url(${positionMarker})`,
					backgroundSize: 'cover',
					width: 20,
					height: 30,
				};
			}
			else {
				divStyle = {
					left: `${48 * 0.89 * (703.38/595.38)*(studied/goal) -2}%`,
					bottom: `${99 * 0.83 * (703.38/595.38) * (studied/goal) -2}%` ,
					//backgroundImage: 'url(/static/media/position.3cc72012.svg)',
					backgroundImage: `url(${positionMarker})`,
					backgroundSize: 'cover',
					width: 20,
					height: 30,
				};
			}
	   	}

	   	let divFlag = {
	   		backgroundColor: "transparent",
	   	}

	   	if (studied < goal) {
	   		divFlag = {
				position: "absolute",
		   		backgroundImage: `url(${flag})`,
				backgroundColor: "unset",   
				backgroundSize: 'cover',
		   		width: 20,
		   		height: 20,
		   		left: "50%",
		   		top: "0px",
				transform: "translate(-20px, -25px)"
			}
	   	}
	   

	   	let [studiedHours, studiedMinutes] = toHoursMinutes(studied)

	   	let remainingHours = goal - studiedHours
	   	let remainingMinutes = 0

	   	if(studiedMinutes !== 0 && studiedMinutes !== '') {
			remainingMinutes = 60 - studiedMinutes
			remainingHours -= 1
		}

	   	let remainingMessage = ''

	   	if(remainingHours === 0 && remainingMinutes === 0)
	   		remainingMessage = ` ${goal}`

	   	if(remainingHours !== 0)
	   		remainingMessage += ` ${remainingHours} h`

	   	if(remainingMinutes !== 0)
	   		remainingMessage += ` ${remainingMinutes} min`

	   	if(studied >= goal)
	   		remainingMessage = ' 0 min'

		return(

			<div className="stat_image_conatiner not_color">
				<div className="stat_info">
							<h1>Mt. {mountain.name}</h1>
							<p>Mål: {`${goal} h `} &nbsp;&nbsp;&nbsp;&nbsp; Tid kvar: {`${remainingMessage}`}</p>
							<p>Nedlagd tid: {`${this.studiedMessage}`}</p>
							<p></p>
							<p>Slutdatum: {`${date} `} </p>
				</div>

				<div className="stat_image" style={imageHeight}>
					<div className="flag_position" style={divFlag}/>
					<div className="mountain_position" style={divStyle}/>
				</div>

				<div className="button_container stat_buttons">
					<Button className = "backButton" onClick={this.goHome}/>
					<Button className = "deleteButton" onClick={this.deleteMountain}/>
				</div>
			</div>

		)
	}
}

export default onClickOutside(MountainInfo)

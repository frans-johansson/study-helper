import React, { Component } from 'react'
import { toHoursMinutes } from '../Utils'
import swal from '@sweetalert/with-react';
import Button from './Button.js'


class MountainInfo extends Component {
	constructor(props) {
		super(props)
		this.goHome = this.goHome.bind(this)
		this.deleteMountain = this.deleteMountain.bind(this)


		let studied = this.props.subcomponentProps.highlightedMountain.studied
		let name = this.props.subcomponentProps.highlightedMountain.name

		let [hours, minutes] = toHoursMinutes(studied)

		this.studiedMessage = ''

		if (hours == 0 && minutes == 0)
			this.studiedMessage += `Du har inte börjat plugga ${name} än`

		if (hours != 0)
			this.studiedMessage += `${hours} h`
		if (minutes != 0)
			this.studiedMessage += `${minutes} min`
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


	render() {
		let mountain = this.props.subcomponentProps.highlightedMountain
		let {goal, date, studied, color, id} = mountain

		let divStyle = {
	        left: 0,
	        bottom: 0,
	        width: 10,
	   		height: 10,
	    }
        				// Denna länk: https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91

		if(studied>0){
			divStyle = {
	            left: 215*(studied/goal),
	            bottom: 499*(studied/goal),
	            backgroundColor: `${color}`,
	   			//backgroundImage: 'url(/static/media/position.4f7a9f24.svg)',
	   			backgroundSize: 'cover',
	   			width: 10,
	   			height: 10,
	   			borderRadius: 100,
	        };
	   	}

	   	let remainingTime = goal - studied

	   	let [remainingHours, remainingMinutes] = toHoursMinutes(remainingTime)

	   	let remainingMessage = ''

	   	if(remainingHours == 0 && remainingMinutes == 0)
	   		remainingMessage = ` ${goal}`

	   	if(remainingHours != 0)
	   		remainingMessage += ` ${remainingHours} h`

	   	if(remainingMinutes != 0)
	   		remainingMessage += ` ${remainingMinutes} min`

		return(

				<div className="stat_image_conatiner">
					<div className="mountain_climber_container">
						<div className="mountain_position" style={divStyle}/>
						<h1>{mountain.name}</h1>
						<p>Mål: {`${goal} h `} </p>
						<p>Nedlagd tid: {`${this.studiedMessage}`}</p>
						<p>Tid kvar: {`${remainingMessage}`}</p>
						<p>Slutdatum: {`${date} `} </p>
						<div className="button_container">
							<Button className = "backButton" onClick={this.goHome}/>
							<Button className = "deleteButton" onClick={this.deleteMountain}/>
						</div>
					</div>
				</div>

		)
	}
}

export default MountainInfo

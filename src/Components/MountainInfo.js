import React, { Component } from 'react'
import Button from './Button'
import { toHoursMinutes } from '../Utils'


class MountainInfo extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)

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

	handleClick() {
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
	   			width: 20,
	   			height: 20,
	   			borderRadius: 100,
	        };

	        console.log(divStyle)
	   	}


		return(

			<div className="sub_page_container">

			 {/*Tillbaka knapp funkar ej ty div ligger över*/}
				<div className="stat_image_conatiner">
					<div className="mountain_climber_container">
						<div className="mountain_position" style={divStyle}/>
						<h1>{mountain.name}</h1>
						<p>{`Mål: ${goal} h Slutdatum: ${date} Nedlagd tid: ${this.studiedMessage}`}</p>
						<div className="button_container">
							<Button text="Tillbaka" onClick={this.handleClick}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default MountainInfo
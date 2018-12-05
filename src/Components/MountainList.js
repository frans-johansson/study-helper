import React, { Component } from 'react';

import Button from './Button.js' 
import ProgressBar from '../Components/ProgressBar.js'
import { toHoursMinutes } from '../Utils'

class MountainData extends Component {

	constructor(props) {
		super(props)

		// Formatera pluggad tid
		let [hours, minutes] = toHoursMinutes(this.props.studied)

		this.studiedMessage = ''

		if (hours == 0 && minutes == 0)
			this.studiedMessage += `Du har inte börjat plugga ${this.props.name} än`
		
		if (hours != 0)
			this.studiedMessage += `${hours} h`
		if (minutes != 0)
			this.studiedMessage += `${minutes} min`
	}

	render() {
		return(
			<div >			
				<p>{`${this.studiedMessage} Mål: ${this.props.goal}`}</p>
				<p>{`Slutdatum: ${this.props.date}`}</p>

				<div className="mini_image_conatiner"/>
				<ProgressBar percentage= {this.props.studied} goal={this.props.goal}  mountain={this.props.color}/>
			</div>
		)
	}
}

class ListElement extends Component {
	constructor() {
		super()

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		if(e.target.className == "Clickable") {
			this.props.removeMountain(this.props.id)
		}
		else {
			this.props.displaySubcomponent("mountainInfo")
			this.props.setHighlightedMountain(this.props.id)
		}
	}

	render() {
		return(
			<div onClick={this.handleClick}>
				<h1>{this.props.name}</h1>
				<MountainData 
					name={this.props.name}
					studied={this.props.studied}
					goal={this.props.goal}
					date={this.props.date}
					color={this.props.color}
			  	/>
			  	<Button 
			  		text="Radera berg"
		  		/>
			</div>
		)
	}
}

class MountainList extends Component {
	render() {
		return(
			<div className={this.props.className}>
				<h2>DINA BERG</h2>
				{
					this.props.mountains.map(
						(m) => <ListElement
									name={m.name}
									studied={m.studied}
									goal={m.goal}
									date={m.date}
									key={m.id}
									id={m.id} 
									color={m.color} 

									removeMountain={this.props.removeMountain}
									setHighlightedMountain={this.props.setHighlightedMountain}
									displaySubcomponent={this.props.displaySubcomponent}
								/>
					)
				}
			</div>
		)
	}
}

export default MountainList
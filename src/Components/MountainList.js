import React, { Component } from 'react';
import swal from '@sweetalert/with-react';
import '../Stylesheets/mountainList.scss'

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
		let p=100*(this.props.studied/this.props.goal)

		return(
			<div>
				<h1 style={{color: this.props.color}}>
					{this.props.name}
				</h1>
				<p>{this.studiedMessage}</p>
				<ProgressBar
					percentage={p}
					goal={this.props.goal}
					mountain={this.props.color}
				/>
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
		this.props.displaySubcomponent("mountainInfo")
		this.props.setHighlightedMountain(this.props.id)
	}

	render() {
		return(
			<div className="list_element" onClick={this.handleClick}>
				<div className="mountain_thumbnail"/>
				<MountainData
					name={this.props.name}
					studied={this.props.studied}
					goal={this.props.goal}
					color={this.props.color}
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

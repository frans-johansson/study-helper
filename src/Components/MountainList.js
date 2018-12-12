import React, { Component } from 'react';
import '../Stylesheets/mountainList.scss'

import ProgressBar from '../Components/ProgressBar.js'
import { toHoursMinutes } from '../Utils'

class MountainData extends Component {

	constructor(props) {
		super(props)

		// Formatera pluggad tid
		let [hoursStudied, minutesStudied] = toHoursMinutes(this.props.studied)

		let hoursLeft = this.props.goal - hoursStudied
		let minutesLeft = 0

		if(minutesStudied !== 0 || minutesStudied !== '') {
			minutesLeft = 60 - minutesStudied
			hoursLeft -= 1
		}


		this.studiedMessage = 'Kvar till mål:'

		if (hoursStudied === 0 && minutesStudied === 0)
			this.studiedMessage += ` ${this.props.goal} h`

		if (hoursStudied === 0 && minutesStudied !== 0 && hoursLeft !== 0) {
			this.studiedMessage += ` ${hoursLeft} h`
		}

		if (hoursStudied !== 0)
			this.studiedMessage += ` ${hoursLeft} h`

		if (minutesStudied !== 0 && minutesLeft !== 0)
			this.studiedMessage += ` ${minutesLeft} min`
	}

	render() {
		let p=100*(this.props.studied/this.props.goal)

		return(
			<div>
				<h1 style={{color: this.props.color}}>
					Mt. {this.props.name}
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

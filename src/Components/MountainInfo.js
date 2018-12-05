import React, { Component } from 'react'
import Button from './Button'
import MountainClimber from './MountainClimber'

class MountainInfo extends Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick() {
		this.props.clearSubcomponent()
		this.props.subcomponentProps.clearHighlightedMountain()
	}

	render() {
		let mountain = this.props.subcomponentProps.highlightedMountain
		let {goal, date, studied, color, id} = mountain

		return(

			<div className="sub_page_container">

			<MountainClimber percentage= {studied} goal={goal} mountain={color}/> //Tillbaka knapp funkar ej ty div ligger över
				<div className="stat_image_conatiner">

					<h1>{mountain.name}</h1>
					<p>{`Mål:${goal} Slutdatum:${date} Antal timmar:${studied}`}</p>
					<div className="button_container">
						<Button text="Tillbaka" onClick={this.handleClick}/>
					</div>
				</div>
			</div>
		)
	}
}

export default MountainInfo
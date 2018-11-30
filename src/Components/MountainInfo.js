import React, { Component } from 'react'
import Button from './Button'

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
		let [mountain] = this.props.subcomponentProps.highlightedMountain
		let {goal, date, studied, color, id} = mountain

		return(

			<div class="sub_page_container">
				<div class="stat_image_conatiner">
					<h1>{mountain.name}</h1>
					<p>{`Mål:${goal} Slutdatum:${date} Antal timmar:${studied} Färg:${color} Skapat:${id}`}</p>
					<div class="button_container">
						<Button text="Tillbaka" onClick={this.handleClick}/>
					</div>
				</div>
			</div>
		)
	}
}

export default MountainInfo
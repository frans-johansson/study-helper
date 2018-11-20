import React, { Component } from 'react'

import { MountainEdit, getMountains, removeMountain } from './MountainDataManager.js' 
import DEBUG_Remove from './Components/Button.js' 

class MountainInfo extends Component {
	render() {
		return(
			<div>
				<p>{`Antal timmar: ${this.props.hoursCompleted} Mål: ${this.props.hoursGoal}`}</p>
				<p>{`Slutdatum: ${this.props.endDate}`}</p>
			</div>
		)
	}
}

class ListElement extends Component {

	render() {
		return(
			<div>
				<h1>{this.props.name}</h1>
				<MountainInfo hoursCompleted={this.props.hoursCompleted}
							  hoursGoal={this.props.hoursGoal}
							  endDate={this.props.endDate}
			  	/>
			  	<MountainEdit />
			  	<DEBUG_Remove onClick={ () => {removeMountain(this.props.id)} } />
			</div>
		)
	}
}

class MountainList extends Component {
	render() {

		let mountains = getMountains()

		console.log(mountains)

		return(
			<div>
				{
					mountains.map(
						(m) => <ListElement
									name={m.name}
									hoursCompleted={m.studied}
									hoursGoal={m.timeGoal}
									endDate={m.date}
									key={m.key}
									id={m.key} 
								/>
					)
				}
			</div>
		)
	}
}

export default MountainList
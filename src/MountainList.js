import React, { Component } from 'react'

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
			  	<DEBUG_Remove onClick={ () => {this.props.removeMountain(this.props.id)} } />
			</div>
		)
	}
}

class MountainList extends Component {
	render() {
		return(
			<div>
				{
					this.props.mountains.map(
						(m) => <ListElement
									name={m.name}
									hoursCompleted={m.studied}
									hoursGoal={m.goal}
									endDate={m.date}
									key={m.id}
									id={m.id} 

									removeMountain={this.props.removeMountain}
								/>
					)
				}
			</div>
		)
	}
}

export default MountainList
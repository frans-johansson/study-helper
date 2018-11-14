import React, { Component } from 'react'

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
			</div>
		)
	}
}

class MountainList extends Component {
	render() {

		let mountains = [
			{
				name: "Analys III",
				hoursCompleted: 3,
				hoursGoal: 50,
				endDate: "Idag",
			},
			{
				name: "Analys II",
				hoursCompleted: 90,
				hoursGoal: 91,
				endDate: "Igår",
			},
		]


		return(
			<div>
				{mountains.map( (m) => <ListElement
										name={m.name}
										hoursCompleted={m.hoursCompleted}
										hoursGoal={m.hoursGoal}
										endDate={m.endDate}
									  />
							  )
				}
			</div>
		)
	}
}

export default MountainList
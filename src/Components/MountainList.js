import React, { Component } from 'react';

import Button from './Button.js' 

class MountainInfo extends Component {
	render() {
		return(
			<div>
				<p>{`Antal timmar: ${this.props.studied} Mål: ${this.props.goal}`}</p>
				<p>{`Slutdatum: ${this.props.date}`}</p>
			</div>
		)
	}
}

class ListElement extends Component {
	render() {
		return(
			<div>
				<h1>{this.props.name}</h1>
				<MountainInfo 
					studied={this.props.studied}
					goal={this.props.goal}
					date={this.props.date}
			  	/>
			  	<Button
			  		text="Delete this"
			  		onClick={ () => {this.props.removeMountain(this.props.id)} }
		  		/>
			</div>
		)
	}
}

class MountainList extends Component {
	render() {
		return(
			<div>
				<h2>MOUNTAIN LIST</h2>
				{
					this.props.mountains.map(
						(m) => <ListElement
									name={m.name}
									studied={m.studied}
									goal={m.goal}
									date={m.date}
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
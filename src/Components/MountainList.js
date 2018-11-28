import React, { Component } from 'react';

import Button from './Button.js' 

class MountainData extends Component {
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
			<div className="listElement" onClick={this.handleClick}>
				<h1>{this.props.name}</h1>
				<MountainData 
					studied={this.props.studied}
					goal={this.props.goal}
					date={this.props.date}
			  	/>
			  	<Button
			  		text="Delete this"
			  		onClick={this.handleClick}
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
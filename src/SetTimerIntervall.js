import React, { Component } from 'react'

class SetTimerIntervall extends Component {

	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(event) {

		event.preventDefault();
		this.props.setTimeState(event.target.elements.inputTime.value);
		
		console.log("in handleSubmit" + event.target.elements.inputTime.value);

	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Plugg: 
						<input type="number" name="inputTime" defaultValue={this.props.defaultTime} />
						
					</label>
						<input type="submit" value="Submit"/>
				</form>
			</div>
		)
	}
}

export default SetTimerIntervall

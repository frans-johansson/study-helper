import React, { Component } from 'react'
let pauseTime = [0,15];

class SetTimerIntervall extends Component {
	

	constructor(props) {
		super(props)
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	

	handleSubmit(event) {

		event.preventDefault();
		this.props.setTimeState(event.target.elements.inputTimeH.value, event.target.elements.inputTimeMin.value);

		this.props.setPauseState(event.target.elements.inputTimePauseH.value, event.target.elements.inputTimePauseMin.value);
	

	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Pluggtid Timmar:
						<input type="number" name="inputTimeH" defaultValueH={this.props.defaultTime} />
						Minuter: <input type="number" name="inputTimeMin" defaultValueMin={this.props.defaultTime} />
				
						Paustid Timmar:
						<input type="number" name="inputTimePauseH" defaultValuePauseH={this.props.defaultTime} />
						Minuter: <input type="number" name="inputTimePauseMin" defaultValuePauseMin={this.props.defaultTime} />
					</label>
						<input type="submit" value="Submit"/>
				</form>
			</div>
		)
	}
}

export default SetTimerIntervall

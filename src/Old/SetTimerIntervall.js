import React, { Component } from 'react'

import TimerTest from './TimerTest.js'

class SetTimerIntervall extends Component {

	constructor(props) {
		super()

		this.state = {
			value: props.value
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		this.setState({value: event.target.value});
	}

	render() {
		return(
			<div>
				<form>
					<label>
						Plugg: 
						<input type="text" value={this.state.value} onChange={this.handleChange}/>
					</label>
						<input type="submit" value="Submit"/>
				</form>
			</div>
		)
	}
}

export default SetTimerIntervall
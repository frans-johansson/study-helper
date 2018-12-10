import React, { Component } from 'react'
import Button from '../Components/Button.js'

let ifMountainSelected = false;

class MountainChoice extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)

		this.state = {
			isSelected: false,
		}
	}

	handleClick(id) {
		let {isSelected} = this.state;
		
		if(!isSelected){
			this.props.setSelectedMountain(id)
			ifMountainSelected = true;
		}
		else{
			this.props.clearSelectedMountain()
			ifMountainSelected = false;
		}

		this.setState({
			isSelected: !isSelected
		})
	}

	// The className mountainSelection is a test class and should be changed later
	render() {

		let divStyle={
			backgroundColor:`${this.props.color}`,
		}

		return(
			<button className="mountainSelection" style={divStyle} onClick={() => this.handleClick(this.props.id)} />
		)
	}
}

class MountainSelector extends Component {
	constructor(props){
		super(props)
	}

	render() {
		return(
			<div>
				{
					this.props.mountains.map(
						(m) => {
							return(
								<MountainChoice
									id={m.id}
									color={m.color}
									setSelectedMountain={this.props.setSelectedMountain}
									clearSelectedMountain={this.props.clearSelectedMountain}/>
							)
						}
					)
				}
			</div>
		)
	}
}

class SimpleTimerSetup extends Component {

	constructor(props) {
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
        event.preventDefault();

        let {setTimeInput, setPauseInput, setActiveView} = this.props.subcomponentProps

		setTimeInput(event.target.elements.inputTimeH.value, event.target.elements.inputTimeMin.value);
        setPauseInput(event.target.elements.inputTimePauseH.value, event.target.elements.inputTimePauseMin.value);

        this.props.clearSubcomponent()
        setActiveView("timer")
	}

	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<label> Pluggtid Timmar: </label>
					<input type="number" min="0" name="inputTimeH" defaultValueH={this.props.defaultTime} />

					<label>Minuter:</label>
					<input type="number" min="0" name="inputTimeMin" defaultValueMin={this.props.defaultTime} />

					<label>Paustid Timmar:</label>
					<input type="number" min="0" name="inputTimePauseH" defaultValuePauseH={this.props.defaultTime} />

					<label>Minuter:</label>
					<input type="number" min="0" name="inputTimePauseMin" defaultValuePauseMin={this.props.defaultTime} />

					<input type="submit" value="" disabled={!ifMountainSelected}/>

				</form>

				<label>Välj berg:</label>
				<MountainSelector
					setSelectedMountain={this.props.subcomponentProps.setSelectedMountain}
					clearSelectedMountain={this.props.subcomponentProps.clearSelectedMountain}
					mountains={this.props.subcomponentProps.mountains}/>
				
				<Button
					onClick={ () => {this.props.clearSubcomponent()}}
					className="homeButton"
				/>

			</div>
		)
	}
}

export default SimpleTimerSetup

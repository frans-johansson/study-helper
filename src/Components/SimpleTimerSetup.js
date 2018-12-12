import React, { Component } from 'react'
import Button from '../Components/Button.js'

let ifMountainSelected = false;
let correctInputValuesStudy = false;
let correctInputValuesPause = false;
let studyDefaultMinutes = 45
let pauseDefaultMinutes = 15

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
			<Button className="mountainSelection" text={`${this.props.name}`} style={divStyle} onClick={() => this.handleClick(this.props.id)} />
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
									name={m.name}
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
		this.goHome	= this.goHome.bind(this)
		this.checkInputValuesStudy = this.checkInputValuesStudy.bind(this)
		this.checkInputValuesPause = this.checkInputValuesPause.bind(this)
		this.handleChangeStudy = this.handleChangeStudy.bind(this)
		this.handleChangePause = this.handleChangePause.bind(this)
	}

	checkInputValuesStudy(event) {

		if(event.target.value == '' || event.target.value == 0) {
			correctInputValuesStudy = false
		}
		else {
			correctInputValuesStudy = true
		}

		this.forceUpdate()
	}

	checkInputValuesPause(event) {

		if(event.target.value == '' || event.target.value == 0) {
			correctInputValuesPause = false
		}
		else {
			correctInputValuesPause = true
		}

		this.forceUpdate()

	}

	goHome() {
		ifMountainSelected = false
		correctInputValuesStudy = false
		correctInputValuesPause = false
		studyDefaultMinutes = 45
		pauseDefaultMinutes = 15

		this.props.clearSubcomponent()
	}

	handleChangeStudy(event) {
		studyDefaultMinutes = event.target.value
	}

	handleChangePause(event) {
		pauseDefaultMinutes = event.target.value
	}

	handleSubmit(event) {
        event.preventDefault();
        ifMountainSelected = false
        correctInputValuesStudy = false
		correctInputValuesPause = false
		studyDefaultMinutes = 45
		pauseDefaultMinutes = 15

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
					<input type="number" min="0" name="inputTimeH" onInput={this.checkInputValuesStudy} />

					<label>Minuter:</label>
					<input type="number" min="0" name="inputTimeMin" value={studyDefaultMinutes} onChange={this.handleChangeStudy} onInput={this.checkInputValuesStudy}/>

					<label>Paustid Timmar:</label>
					<input type="number" min="0" name="inputTimePauseH" onInput={this.checkInputValuesPause}/>

					<label>Minuter:</label>
					<input type="number" min="0" name="inputTimePauseMin" value={pauseDefaultMinutes} onChange={this.handleChangePause} onInput={this.checkInputValuesPause}/>

					<input type="submit" value="" disabled={!ifMountainSelected || !correctInputValuesStudy || !correctInputValuesPause}/>

				</form>

				<label>Välj berg:</label>
				<MountainSelector
					setSelectedMountain={this.props.subcomponentProps.setSelectedMountain}
					clearSelectedMountain={this.props.subcomponentProps.clearSelectedMountain}
					mountains={this.props.subcomponentProps.mountains}/>
				
				
				<Button onClick={this.goHome}
				className="homeButton" />
				

			</div>
		)
	}
}

export default SimpleTimerSetup

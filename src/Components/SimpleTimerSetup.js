import React, { Component } from 'react'
import Button from '../Components/Button.js'
import onClickOutside from 'react-onclickoutside'

let ifMountainSelected = false
let isSelected = ''

let correctInputValuesStudyHours = false
let correctInputValuesStudyMinutes = true
let correctInputValuesPauseHours = false
let correctInputValuesPauseMinutes = true
let correctInputValues = true

let studyDefaultHours = 0
let studyDefaultMinutes = 45
let pauseDefaultHours = 0
let pauseDefaultMinutes = 15

class MountainChoice extends Component {
	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	//IDE! Istället för isSelected är en bool, låt isSelected spara id:et på den som är vald och använd det!

	handleClick(id) {

		if(isSelected === ''){

			this.props.setSelectedMountain(id)

			ifMountainSelected = true
			isSelected = id
		}
		else if(isSelected === id) {

			this.props.clearSelectedMountain()
			ifMountainSelected = false
			isSelected = ''
		}
		else if(isSelected !== id) {

			this.props.setSelectedMountain(id)

			ifMountainSelected = true
			isSelected = id

			this.props.updateButtons()
		}

	}

	// The className mountainSelection is a test class and should be changed later
	render() {

		let opa = 0.5
		let bordCol = ""
		let bordWid = 0

		if(isSelected === this.props.id) {
			opa = 1
			bordCol = "#707070"
			bordWid = 2
		}

		let divStyle={
			backgroundColor: `${this.props.color}`,
			opacity: `${opa}`,
			borderWidth: bordWid,
			borderColor: `${bordCol}`,
			borderStyle: "solid",
		}

		return(
			<Button className="mountainSelection" text={`${this.props.name}`} style={divStyle} onClick={() => this.handleClick(this.props.id)} />
		)
	}
}

class MountainSelector extends Component {

	constructor(props) {
		super(props)

		this.updateButtons = this.updateButtons.bind(this)
	}

	updateButtons() {
		this.forceUpdate()
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
									clearSelectedMountain={this.props.clearSelectedMountain}
									mountains={this.props.mountains}
									updateButtons={this.updateButtons}/>
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
		this.handleChangeStudyHours = this.handleChangeStudyHours.bind(this)
		this.handleChangeStudyMinutes = this.handleChangeStudyMinutes.bind(this)
		this.handleChangePauseHours = this.handleChangePauseHours.bind(this)
		this.handleChangePauseMinutes = this.handleChangePauseMinutes.bind(this)

	}


	goHome() {
		ifMountainSelected = false
		isSelected = ''
		
		correctInputValuesStudyHours = false
		correctInputValuesStudyHours = true
		correctInputValuesPauseHours = false
		correctInputValuesPauseMinutes = true
		correctInputValues = true

		studyDefaultHours = 0
		studyDefaultMinutes = 45
		pauseDefaultHours = 0
		pauseDefaultMinutes = 15

		this.props.clearSubcomponent()
	}

	handleChangeStudyHours(event) {
		studyDefaultHours = event.target.value

		if(studyDefaultHours === '' || studyDefaultHours === 0) {
			correctInputValuesStudyHours = false
		}
		else {
			correctInputValuesStudyHours = true
		}

		if((correctInputValuesStudyHours || correctInputValuesStudyMinutes) && (correctInputValuesPauseHours || correctInputValuesPauseMinutes)) {
			correctInputValues = true
		}
		else {
			correctInputValues = false
		}

		this.forceUpdate()
	}

	handleChangeStudyMinutes(event) {
		studyDefaultMinutes = event.target.value

		if(studyDefaultMinutes === '' || studyDefaultMinutes === 0) {
			correctInputValuesStudyMinutes = false
		}
		else {
			correctInputValuesStudyMinutes = true
		}

		if((correctInputValuesStudyHours || correctInputValuesStudyMinutes) && (correctInputValuesPauseHours || correctInputValuesPauseMinutes)) {
			correctInputValues = true
		}
		else {
			correctInputValues = false
		}

		this.forceUpdate()

	}

	handleChangePauseHours(event) {
		pauseDefaultHours = event.target.value

		if(pauseDefaultHours === '' || pauseDefaultHours === 0) {
			correctInputValuesPauseHours = false
		}
		else {
			correctInputValuesPauseHours = true
		}

		if((correctInputValuesStudyHours || correctInputValuesStudyMinutes) && (correctInputValuesPauseHours || correctInputValuesPauseMinutes)) {
			correctInputValues = true
		}
		else {
			correctInputValues = false
		}

		this.forceUpdate()
	}

	handleChangePauseMinutes(event) {
		pauseDefaultMinutes = event.target.value

		if(pauseDefaultMinutes === '' || pauseDefaultMinutes === 0) {
			correctInputValuesPauseMinutes = false
		}
		else {
			correctInputValuesPauseMinutes = true
		}


		if((correctInputValuesStudyHours || correctInputValuesStudyMinutes) && (correctInputValuesPauseHours || correctInputValuesPauseMinutes)) {
			correctInputValues = true
		}
		else {
			correctInputValues = false
		}

		this.forceUpdate()
	}

	handleSubmit(event) {
        event.preventDefault();

        ifMountainSelected = false
        isSelected = ''

       	correctInputValuesStudyHours = false
		correctInputValuesStudyHours = true
		correctInputValuesPauseHours = false
		correctInputValuesPauseMinutes = true
		correctInputValues = true

		studyDefaultHours = 0
		studyDefaultMinutes = 45
		pauseDefaultHours = 0
		pauseDefaultMinutes = 15

        let {setTimeInput, setPauseInput, setActiveView} = this.props.subcomponentProps

		setTimeInput(event.target.elements.inputTimeH.value, event.target.elements.inputTimeMin.value);
        setPauseInput(event.target.elements.inputTimePauseH.value, event.target.elements.inputTimePauseMin.value);

        this.props.clearSubcomponent()
        setActiveView("timer")
	}

	handleClickOutside = () => {
		this.goHome()
	}

	render() {

		return(
			<div className="scroll" >
				<form onSubmit={this.handleSubmit}>
					<label className="block-label"> Fyll i pluggtid! </label>
					<div className="timer_setup">
						<div>
							<input type="number" placeholder="0" min="0" name="inputTimeH" value={studyDefaultHours} onChange={this.handleChangeStudyHours} />
							<label>Timmar</label>
						</div>
						<div>
							<input type="number" placeholder="0" min="0" name="inputTimeMin" value={studyDefaultMinutes} onChange={this.handleChangeStudyMinutes} />
							<label>Minuter</label>
						</div>

					</div>

					<label className="block-label">Fyll i paustid!</label>
					<div className="timer_setup">
						<div>
							<input type="number" placeholder="0" min="0" name="inputTimePauseH" value={pauseDefaultHours} onChange={this.handleChangePauseHours}/>
							<label>Timmar</label>
						</div>
						<div>
							<input type="number" placeholder="0" min="0" name="inputTimePauseMin" value={pauseDefaultMinutes} onChange={this.handleChangePauseMinutes}/>
							<label>Minuter</label>
						</div>
					</div>

					<input type="submit" value="" disabled={!ifMountainSelected || !correctInputValues}/>

				</form>

				<label className="block-label">Välj berg:</label>

				<div className="timer_center">
					<MountainSelector
						setSelectedMountain={this.props.subcomponentProps.setSelectedMountain}
						clearSelectedMountain={this.props.subcomponentProps.clearSelectedMountain}
						mountains={this.props.subcomponentProps.mountains}/>
				</div>

				<Button onClick={this.goHome}
				className="backButton blue"
				positioning="right-absolute"
				 />


			</div>
		)
	}
}

export default onClickOutside(SimpleTimerSetup)

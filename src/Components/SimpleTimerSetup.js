import React, { Component } from 'react'

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

		if(isSelected)
			this.props.setSelectedMountain(id)
		else 
			this.props.clearSelectedMountain()

		this.setState({
			isSelected: !isSelected
		})
	}

	render() {
		return(
			<div className="mountainSelection" onClick={this.handleClick(this.props.id)}/>
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
			<div class="sub_page_container">
				<form onSubmit={this.handleSubmit}>
					<label> Pluggtid Timmar: </label>
					<input type="number" name="inputTimeH" defaultValueH={this.props.defaultTime} />
					
					<label>Minuter:</label>
					<input type="number" name="inputTimeMin" defaultValueMin={this.props.defaultTime} />
					
					<label>Paustid Timmar:</label>
					<input type="number" name="inputTimePauseH" defaultValuePauseH={this.props.defaultTime} />
					
					<label>Minuter:</label>
					<input type="number" name="inputTimePauseMin" defaultValuePauseMin={this.props.defaultTime} />

					<MountainSelector
						setSelectedMountain={this.subcomponentProps.setSelectedMountain}
						clearSelectedMountain={this.subcomponentProps.clearSelectedMountain}/>

					<input type="submit" value="Submit"/>
				</form>
			</div>
		)
	}
}

export default SimpleTimerSetup
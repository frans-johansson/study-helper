import React, { Component } from 'react'

// View imports
import Home from './Views/Home'
import Archive from './Views/Archive'
import Timer from './Views/Timer'

// Component imports
import NullComponent from './Components/NullComponent'
import MountainData from './MountainData'
import NewMountain from './Components/NewMountain'
import MountainInfo from './Components/MountainInfo'
import SimpleTimerSetup from './Components/SimpleTimerSetup';

// Register of available components.
const components = {
	// Views
	home: Home,
	timer: Timer,
	archive: Archive,
	// Subcomponents
	newMountain: NewMountain,
	mountainInfo: MountainInfo,
	simpleTimerSetup: SimpleTimerSetup,
	// Null
	nullComponent: NullComponent,
}

function findMountain(id, array) {
	return [array.filter( (m) => m.id == id)]
}

class AppController extends Component {
	constructor() {
		super()
		// Display functions
   		this.setActiveView = this.setActiveView.bind(this)
   		this.displaySubcomponent = this.displaySubcomponent.bind(this)
   		this.clearSubcomponent = this.clearSubcomponent.bind(this);
		// Mountain management
		this.updateMountainList = this.updateMountainList.bind(this)
		this.removeMountain = this.removeMountain.bind(this)
		this.addMountain = this.addMountain.bind(this)
		// Mountain information 
		this.setHighlightedMountain = this.setHighlightedMountain.bind(this)
		this.clearHighlightedMountain = this.clearHighlightedMountain.bind(this)
		// Timer functions
		this.setTimeInput = this.setTimeInput.bind(this)
		this.setPauseInput = this.setPauseInput.bind(this)
		this.setSelectedMountain = this.setSelectedMountain.bind(this)
		this.clearSelectedMountain = this.clearSelectedMountain.bind(this)

   		this.state = {
			// Controlling what is displayed
   			activeView: "home",
   			subcomponent: "nullComponent",

			// Mountain
   			mountains: [],
			highlightedMountain: undefined,
			   
			// Timer with defaults
			timeInput: [0,45],
			pauseInput: [0,15],
			selectedMountain: undefined,
   		}	
 	}

	/* INITS */
	componentWillMount() {
		this.updateMountainList()
	}

	/* DISPLAY */
  	setActiveView(view) {
    	this.setState({
      		activeView: view,
      		subcomponent: "nullComponent",
    	})
  	}

  	displaySubcomponent(component) {
  		this.setState({
  			subcomponent: component,
  		})
  	}

  	clearSubcomponent() {
  		this.setState({
  			subcomponent: "nullComponent",
  		})	
  	}

	/* MOUNTAINS */
	updateMountainList() {
		let updatedList = JSON.parse(window.localStorage.getItem("mountains"))
  		if(!updatedList)
    		updatedList = []

		this.setState({
			mountains: updatedList,
		})
	}

	removeMountain(key) {
		let remainingMountains = this.state.mountains.filter((m) => m.id != key)

		window.localStorage.setItem("mountains", JSON.stringify(remainingMountains))

		this.updateMountainList()
	}

	addMountain(name, goal, date, color, id) {
		let mountains = JSON.parse(window.localStorage.getItem("mountains"))
	    if (!mountains)
	      mountains = []

	    // Create a new mountain object and place it at the end of the array
	    let newMountain = new MountainData(name, goal, date, color, id)
	    mountains.push(newMountain)

	    // Updates the array in local storage
	    window.localStorage.setItem("mountains", JSON.stringify(mountains))

	    // Updates the app state with the new mountain
	    this.updateMountainList()
	}

	clearHighlightedMountain() {
		this.setState({
			highlightedMountain: undefined,
		})
	}

	setHighlightedMountain(id) {
		let m = findMountain(id, this.state.mountains)

		this.setState({
			highlightedMountain: m,
		})
	}

	/* TIMER */
	setTimeInput(hours, minutes) {
		let time = [hours, minutes];

		this.setState({timeInput: time});
	}

	setPauseInput(hours, minutes){
		let pause = [hours, minutes];

		this.setState({pauseInput: pause});
	}

	setSelectedMountain(id) {
		let m = findMountain(id, this.state.mountains)

		this.setState({
			selectedMountain: m,
		})
	}

	clearSelectedMountain() {
		this.setState({
			selectedMountain: undefined,
		})
	}

	render() {
		let { activeView, subcomponent } = this.state
		const ActiveView = components[activeView]
		const Subcomponent = components[subcomponent]

		// Register of props that correspond to each component
		// Will be passed either as viewProps or subcomponentProps
		const _props = {
			home: {
				mountains: this.state.mountains,
   				removeMountain: this.removeMountain,
   				setHighlightedMountain: this.setHighlightedMountain,
			},

			timer: {
				time: this.state.timeInput,
				pauseTime: this.state.pauseInput,
			},

			newMountain: {
				updateMountainList: this.updateMountainList,
   				addMountain: this.addMountain,
   				mountains: this.state.mountains,
			},

			mountainInfo: {
				highlightedMountain: this.state.highlightedMountain,
				clearHighlightedMountain: this.clearHighlightedMountain,
			},

			simpleTimerSetup: {
				setTimeInput: this.setTimeInput,
				setPauseInput: this.setPauseInput,
				setActiveView: this.setActiveView,

				// Mountain selection
				mountains: this.state.mountains,
				setSelectedMountain: this.setSelectedMountain,
				clearSelectedMountain: this.clearSelectedMountain,
			},
		}
		// Props passed to each component
		const viewProps = _props[activeView]
		const subcomponentProps = _props[subcomponent]

		return(
			<div>
				<div class="page_container">
				<ActiveView 
					setActiveView={this.setActiveView}
					displaySubcomponent={this.displaySubcomponent}
					viewProps={viewProps}>

					<Subcomponent
						clearSubcomponent={this.clearSubcomponent}
						subcomponentProps={subcomponentProps}/>

				</ActiveView>
				</div>
			</div>
		)
	}
}

export default AppController
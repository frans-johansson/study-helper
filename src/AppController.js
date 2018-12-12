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
	return array.filter((m) => m.id == id).shift()
}

class AppController extends Component {
	constructor() {
		super()
		// Display functions
   		this.setActiveView = this.setActiveView.bind(this)
   		this.displaySubcomponent = this.displaySubcomponent.bind(this)
   		this.clearSubcomponent = this.clearSubcomponent.bind(this)
   		// Progress
   		this.incrementWorkToday = this.incrementWorkToday.bind(this)
		// Mountain management
		this.updateMountainList = this.updateMountainList.bind(this)
		this.removeMountain = this.removeMountain.bind(this)
		this.addMountain = this.addMountain.bind(this)
		this.incrementStudied = this.incrementStudied.bind(this)
		this.updatePreviousDate = this.updatePreviousDate.bind(this)
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

   			// Progress
   			workToday: 0,
   			workYesterday: 0,

			// Mountain
   			mountains: [],
			highlightedMountain: undefined,
			colors: undefined,
			   
			// Timer with defaults
			timeInput: [0,45],
			pauseInput: [0,15],
			selectedMountain: undefined,
   		}	
 	}

	/* INITS */
	componentWillMount() {
		// Add colors to local storage 
		if (!window.localStorage.getItem("colors")) {
			let colors = ['#5A999D', '#D17B6E', '#868D6E', '#AD7B98', '#78B0E8', 
						  '#D498CF', '#91BE7B', '#76639A', '#5360A5', '#5360A5']
			// Sets array in state
			this.setState({
				colors: colors,
			})
			// Sets array in storage
			window.localStorage.setItem("colors", JSON.stringify(colors))
		}

		// Set up variables for progress
		let progressTracking = JSON.parse(window.localStorage.getItem("progressTracking"))
		let workToday = 0
		let workYesterday = 0
		let currentDate = 0
		let lastDate = 0


		if (!progressTracking) { // If uninitialized
			[workToday, workYesterday, currentDate, lastDate] = [0, 0, new Date().toLocaleDateString(), '']			

			window.localStorage.setItem("progressTracking", JSON.stringify({workToday, workYesterday, currentDate, lastDate}))
		}
		else { // If it exists in storage
			let todayDate = new Date().toLocaleDateString()
			workToday = progressTracking.workToday
			workYesterday = progressTracking.workYesterday
			currentDate = progressTracking.currentDate
			lastDate = progressTracking.lastDate

			// Check for new date
			if (todayDate != currentDate && workToday > 0) {
				[workToday, workYesterday, currentDate, lastDate] = [0, workToday, todayDate, currentDate] // Shifterino
			}

			window.localStorage.setItem("progressTracking", JSON.stringify({workToday, workYesterday, currentDate, lastDate}))
		}

		// Update app state
		this.setState({
			workToday: workToday,
			workYesterday: workYesterday,
		})
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

  	/* PROGRESS */
  	incrementWorkToday(amount) {
  		let {workToday, workYesterday} = this.state
  		workToday += amount

  		this.setState({
  			workToday: workToday,
  		})

  		let progressTracking = JSON.parse(window.localStorage.getItem("progressTracking"))
		let {currentDate, lastDate} = progressTracking
		console.log(workToday)
		window.localStorage.setItem("progressTracking", JSON.stringify({workToday, workYesterday, currentDate, lastDate}))
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

	removeMountain(id) {

		console.log(id)

		// Add the color back to local storage
		let color = findMountain(id, this.state.mountains).color
		let colors = JSON.parse(window.localStorage.getItem("colors"))

		console.log(color)
		console.log(colors)

		colors.push(color)
		window.localStorage.setItem("colors", JSON.stringify(colors))

		// Remove mountain from local storage
		let remainingMountains = this.state.mountains.filter((m) => m.id != id)
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

	    // Remove the used color from local storage
	    let colors = JSON.parse(window.localStorage.getItem("colors"))
	    colors.shift()
	    window.localStorage.setItem("colors", JSON.stringify(colors))

	    // Updates the app state with the new mountain
	    this.updateMountainList()
	}

	updatePreviousDate(id) {
		let mountain = findMountain(id, this.state.mountains)
		let i = this.state.mountains.indexOf(mountain)

		// Updates the date of this mountain in the state array
		this.state.mountains[i].previousDate = new Date().toDateString()

		console.log(this.state.mountains[i].previousDate)

		// Push changes to local storage
		window.localStorage.setItem("mountains", JSON.stringify(this.state.mountains))
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

	incrementStudied(id, amount) {
		let mountain = findMountain(id, this.state.mountains)
		let i = this.state.mountains.indexOf(mountain)
		
		// Convert to hours
		amount /= 3600

		this.state.mountains[i].studied += amount

		window.localStorage.setItem("mountains", JSON.stringify(this.state.mountains))
		this.updateMountainList()
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
				mountain: this.state.selectedMountain,
				incrementWorkToday: this.incrementWorkToday,
				incrementStudied: this.incrementStudied,
				updatePreviousDate: this.updatePreviousDate,
			},

			newMountain: {
				updateMountainList: this.updateMountainList,
   				addMountain: this.addMountain,
   				mountains: this.state.mountains,
			},

			mountainInfo: {
				highlightedMountain: this.state.highlightedMountain,
				clearHighlightedMountain: this.clearHighlightedMountain,
				removeMountain: this.removeMountain,
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

		// Changing styles depending on active view and subcomponent
		let page_container = `page_container ${this.state.activeView}`
		
		// Make background darker when there's something on top
		let overlay = ""
		if (subcomponent != "nullComponent")
			overlay = "darkened"

		return(
			<div>
				<div className={page_container}>
					<ActiveView 
						setActiveView={this.setActiveView}
						displaySubcomponent={this.displaySubcomponent}
						viewProps={viewProps}
						overlay={overlay}>

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
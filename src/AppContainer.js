import React, { Component } from 'react'

import NullComponent from './Components/NullComponent'

import Home from './Views/Home'
import Archive from './Views/Archive'

import MountainData from './MountainData'
import NewMountain from './Components/NewMountain'
import MountainInfo from './Components/MountainInfo'

const components = {
	home: Home,
	archive: Archive,
	newMountain: NewMountain,
	mountainInfo: MountainInfo,

	nullComponent: NullComponent,
}

class AppContainer extends Component {
	constructor() {
		super()

   		this.setActiveView = this.setActiveView.bind(this)
   		this.displaySubcomponent = this.displaySubcomponent.bind(this)
   		this.clearSubcomponent = this.clearSubcomponent.bind(this);

		this.updateMountainList = this.updateMountainList.bind(this)
		this.removeMountain = this.removeMountain.bind(this)
		this.addMountain = this.addMountain.bind(this)
		this.setHighlightedMountain = this.setHighlightedMountain.bind(this)
		this.clearHighlightedMountain = this.clearHighlightedMountain.bind(this)

   		this.state = {
   			activeView: "home",
   			subcomponent: "nullComponent",

   			mountains: [],
   			highlightedMountain: '',
   		}
 	}

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

	componentWillMount() {
		this.updateMountainList()
	}

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
			highlightedMountain: '',
		})
	}

	setHighlightedMountain(id) {
		let m = this.state.mountains.filter((m) => m.id == id)

		console.log(m)

		this.setState({
			highlightedMountain: m,
		})
	}

	render() {

		let { activeView, subcomponent } = this.state
		const ActiveView = components[activeView]
		const Subcomponent = components[subcomponent]

		const _props = {
			home: {
				mountains: this.state.mountains,
   				removeMountain: this.removeMountain,
   				setHighlightedMountain: this.setHighlightedMountain,
			},

			newMountain: {
				updateMountainList: this.updateMountainList,
   				addMountain: this.addMountain,
   				mountains: this.state.mountains,
			},

			mountainInfo: {
				highlightedMountain: this.state.highlightedMountain,
				clearHighlightedMountain: this.clearHighlightedMountain,
			}
		}
		// Props passed to each component
		const viewProps = _props[activeView]
		const subcomponentProps = _props[subcomponent]

		return(
			<div>
				<ActiveView
					setActiveView={this.setActiveView}
					displaySubcomponent={this.displaySubcomponent}
					viewProps={viewProps}>

					<Subcomponent
						clearSubcomponent={this.clearSubcomponent}
						subcomponentProps={subcomponentProps}/>

				</ActiveView>
			</div>
		)
	}
}

export default AppContainer
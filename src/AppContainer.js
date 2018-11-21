import React, { Component } from 'react'

import Home from './Views/Home'
import Archive from './Views/Archive'

import MountainData from './MountainData'
import NewMountain from './Components/NewMountain'

class AppContainer extends Component {
	constructor() {
		super()

		this.changeView = this.changeView.bind(this)
		this.toggleNewMountain = this.toggleNewMountain.bind(this)
		this.updateMountainList = this.updateMountainList.bind(this)
		this.removeMountain = this.removeMountain.bind(this)
		this.addMountain = this.addMountain.bind(this)

		this.state = {
			showHome: true,
			showArchive: false,
			showNewMountain: false,

			mountains: [],
		}
	}

	componentWillMount() {
		this.updateMountainList()
	}

	changeView() {
		this.setState({
			showHome: !(this.state.showHome),
			showArchive: !(this.state.showArchive),
		})
	}

	toggleNewMountain() {
		this.setState({
			showNewMountain: !(this.state.showNewMountain),
		})
	}

	updateMountainList() {
		let updatedList = JSON.parse(window.localStorage.getItem("mountains"))
  		if(!updatedList)
    		updatedList = []

		this.setState({
			mountains: updatedList,
		})

		console.log(this.state.mountains)
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


	render() {
		let {showHome, showArchive, showNewMountain} = this.state

		if(showHome) {
			if (showNewMountain) {
				return(
					<div>
						<NewMountain
							toggleNewMountain={this.toggleNewMountain}
							addMountain={this.addMountain}
						/>
						<Home 
							changeView={this.changeView}
							toggleNewMountain={this.toggleNewMountain}
							updateMountainList={this.updateMountainList}
							removeMountain={this.removeMountain}
							mountains={this.state.mountains}
						/>
					</div>
				)
			}

			return(
				<Home 
					changeView={this.changeView}
					toggleNewMountain={this.toggleNewMountain}
					updateMountainList={this.updateMountainList}
					removeMountain={this.removeMountain}
					mountains={this.state.mountains}
				/>
			)
		}
		else if(showArchive) {
			return(
				<Archive changeView={this.changeView} />
			)
		}

		// Sad div :(
		return(<div/>)
	}
}

export default AppContainer
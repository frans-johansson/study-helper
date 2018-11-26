import React, { Component } from 'react'

import NullComponent from './Components/NullComponent'

import Home from './Views/Home'
import Archive from './Views/Archive'

import MountainData from './MountainData'
import NewMountain from './Components/NewMountain'

const components = {
	home: Home,
	archive: Archive,
	newMountain: NewMountain,

	nullComponent: NullComponent,
}

class AppContainer extends Component {
	constructor() {
		super()

   		this.setActiveView = this.setActiveView.bind(this)
   		this.displaySubComponent = this.displaySubComponent.bind(this)
   		this.clearSubComponent = this.clearSubComponent.bind(this);

		this.updateMountainList = this.updateMountainList.bind(this)
		this.removeMountain = this.removeMountain.bind(this)
		this.addMountain = this.addMountain.bind(this)

   		this.state = {
   			activeView: "home",
   			subComponent: "nullComponent",

   			mountains: [],
   		}
 	}

  	setActiveView(view) {
    	this.setState({
      		activeView: view,
      		subComponent: "nullComponent",
    	})
  	}

  	displaySubComponent(component) {
  		this.setState({
  			subComponent: component,
  		})
  	}

  	clearSubComponent() {
  		this.setState({
  			subComponent: "nullComponent",
  		})	
  	}

		/*this.state = {
			showHome: true,
			showArchive: false,
			showNewMountain: false,

			mountains: [],
		}*/

	componentWillMount() {
		this.updateMountainList()
	}

	/*changeView() {
		this.setState({
			showHome: !(this.state.showHome),
			showArchive: !(this.state.showArchive),
		})
	}

	toggleNewMountain() {
		this.setState({
			showNewMountain: !(this.state.showNewMountain),
		})
	}*/

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


	render() {

		let { activeView, subComponent } = this.state
		const ActiveView = components[activeView]
		const SubComponent = components[subComponent]

		const _props = {
			home: {
				mountains: this.state.mountains,
   				removeMountain: this.removeMountain,	
			},

			newMountain: {
				updateMountainList: this.updateMountainList,
   				addMountain: this.addMountain,
   				mountains: this.state.mountains,
			},
		}
		const viewProps = _props[activeView]
		const subComponentProps = _props[subComponent]

		return(
			<div>
				<ActiveView setActiveView={this.setActiveView} displaySubComponent={this.displaySubComponent} viewProps={viewProps}/>
				<SubComponent clearSubComponent={this.clearSubComponent} subComponentProps={subComponentProps}/>
			</div>
		)

	    /*if(this.state.isToggleOn=="Mountain"){
	      
	      	return(
	      		<div>
	       			<MountainTest/>
	      			<Button text="Tillbaka" onClick={this.handleClick.bind(this, "Back")}/>
	      		</div>);
	    }


	    if(this.state.isToggleOn=="Back"){
	      
	      	return(
	      		<div>
	       			<HomeTest/>
	       		</div>);
	    }


	    if(this.state.isToggleOn=="Timer"){
	      
	    	return(
	      		<div>
	       			<p> finns inte </p>
	       			<Button text="Tillbaka" onClick={this.handleClick.bind(this, "Back")}/>

			    </div>);
	    }


	    if(this.state.isToggleOn=="Archive"){
	      
	      	return(
	      		<div>
	       			<p> finns inte </p>
	       			<Button text="Tillbaka" onClick={this.handleClick.bind(this, "Back")}/>
	       			<ArchiveTest/> 
			    </div>);
	    }


	    if(this.state.isToggleOn=="timertwo"){
	      
	      	return(
	      		<div>
	       			<p> finns inte </p>
	       			<Button text="Tillbaka" onClick={this.handleClick.bind(this, "Back")}/>
	       			<TimerCTest/>	       
	      		</div>);
	    }


	    return (
	     	<div>
	      		<Button text="lägg till berg" onClick={this.handleClick.bind(this, "Mountain")}/>

	      		<Button text="timern" onClick={this.handleClick.bind(this, "Timer")}/>

	      		<Button text="Arkiverade berg" onClick={this.handleClick.bind(this, "Archive")}/>

	      		<Button text="Kalender timer" onClick={this.handleClick.bind(this, "Timertwo")}/>

	       </div>
	      
	    );*/
	}




	/*
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
	}*/
}

export default AppContainer
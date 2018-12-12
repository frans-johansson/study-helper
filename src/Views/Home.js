import React, { Component } from 'react';
import swal from '@sweetalert/with-react'
import '../Stylesheets/home.scss';
import RecentProgress from '../Components/RecentProgress.js'
import MountainList from '../Components/MountainList.js'
import Button from '../Components/Button.js'

let timerButtonClass = "timerButtonDisabled";
let addButtonClass = "addButton";

class Home extends Component {

	constructor(props) {
		super(props)

		this.checkColors = this.checkColors.bind(this)

		this.handleTimer = this.handleTimer.bind(this)
        this.handleMountain = this.handleMountain.bind(this)
	}

	checkColors() {
		let availableColors = true

		let numAvailableColors = JSON.parse(window.localStorage.getItem("colors")).length

		if(numAvailableColors === 0) {
			availableColors = false
			addButtonClass = "addButtonDisabled"
		}else{
			addButtonClass = "addButton"
		}



		if(numAvailableColors < 10) {
			timerButtonClass = "timerButton"

		}else{
			timerButtonClass = "timerButtonDisabled"
		}



		return (
			availableColors
		)
	}

	handleTimer() {

		let numAvailableColors = JSON.parse(window.localStorage.getItem("colors")).length

		if(numAvailableColors < 10) {
			this.props.displaySubcomponent("simpleTimerSetup")
		}
		else {
			swal({
				title: "Oops!",
				text: "Du måste lägga till ett ämne först",
				icon: "warning"
			})
		}	
	}

	handleMountain() {
		let colors = this.checkColors()

		if(colors) {
			this.props.displaySubcomponent("newMountain")
		}
		else {
			swal({
				title: "Oops!",
				text: "Du har nått din maxgräns på berg, vill du lägga till ett nytt måste du tyvärr ta bort ett annat.",
				icon: "warning"
			})
		}
	}

	render() {

		let fix_a_row="fixed as_row fade-top"
		// Make sure the subcomponent container is only visible if it has something to show us
		let subcomponentContainer = "fixed center_on_page has_subcomponent"
		if (!this.props.children.props.subcomponentProps) {
			subcomponentContainer = "hidden"
		}
		
		if (this.props.children.props.subcomponentProps) {
			
			fix_a_row="hidden"
		}
		this.checkColors();

		return(
			<div>
				<div className="header">
					<div className="hills"/>
					<div className="forest_container">
						<div className="forest left"/>
						<div className="forest right"/>
					</div>
				</div>
				
				<div className="view_container">
					<RecentProgress />

					<MountainList className="list"
						displaySubcomponent={this.props.displaySubcomponent}
						clearSubcomponent={this.props.clearSubcomponent}
						mountains={this.props.viewProps.mountains}
						removeMountain={this.props.viewProps.removeMountain}
						setHighlightedMountain={this.props.viewProps.setHighlightedMountain}
					/>

					{/*
					<div >
						<Button text="Arkiverade berg" onClick={ () => {this.props.setActiveView("archive")}} />
					</div>
					*/}
				</div>

				<div className={subcomponentContainer}>
					{this.props.children}
			    </div>

			    <div className={fix_a_row}>
					{/*<Button text="Complicated timer" />*/}

			<Button
						onClick={ () => {this.handleTimer()}}
						className= {timerButtonClass}
					/>
					<Button
						 onClick={ () => {this.handleMountain()}}
						 className= {addButtonClass}
					 />
				</div>
			</div>
		)
	}
}

export default Home

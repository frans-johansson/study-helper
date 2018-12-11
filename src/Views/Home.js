import React, { Component } from 'react';
import swal from '@sweetalert/with-react'
import '../Stylesheets/home.scss';
import RecentProgress from '../Components/RecentProgress.js'
import MountainList from '../Components/MountainList.js'
import Button from '../Components/Button.js'


class Home extends Component {

	constructor(props) {
		super(props)

		this.checkColors = this.checkColors.bind(this)
	}

	checkColors() {
		let availableColors = true

		let numAvailableColors = JSON.parse(window.localStorage.getItem("colors")).length

		if(numAvailableColors == 0) {
			availableColors = false
		}

		console.log(numAvailableColors)
		console.log(availableColors)

		return (
			availableColors
		)
	}

	handleClick() {
		let colors = this.checkColors()

		if(colors) {
			this.props.displaySubcomponent("newMountain")
		}
		else {
			swal({
				title: "Oops!",
				text: "Du har nått din maxgräns på berg",
				icon: "warning"
			})
		}
	}

	render() {

		// Make sure the subcomponent container is only visible if it has something to show us
		let subcomponentContainer = "fixed center_on_page has_subcomponent"
		if (!this.props.children.props.subcomponentProps) {
			subcomponentContainer = "hidden"
		}


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
					<h1>HEM</h1>
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

			    <div className="fixed as_row">
					{/*<Button text="Complicated timer" />*/}
					<Button
						onClick={ () => {this.props.displaySubcomponent("simpleTimerSetup")}}
						className="timerButton"
					/>
					<Button
						 onClick={ () => {this.handleClick()}}
						 className="addButton"
					 />
				</div>
			</div>
		)
	}
}

export default Home

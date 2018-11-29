import React, { Component } from 'react';
import '../Stylesheets/home.scss';
import RecentProgress from '../Components/RecentProgress.js'
import MountainList from '../Components/MountainList.js'
import Button from '../Components/Button.js'


class Home extends Component {
	render() {
		return(
			<div class="page_container">
				

				<div class="page_collum_container">
					<div>
						{this.props.children}
					</div>
					<h1>HOME</h1>
					<div class="place_container">
						<RecentProgress />
					</div>

					<div class="place_container">
						<MountainList
							displaySubcomponent={this.props.displaySubcomponent}
							clearSubcomponent={this.props.clearSubcomponent}
							mountains={this.props.viewProps.mountains}
							removeMountain={this.props.viewProps.removeMountain}
							setHighlightedMountain={this.props.viewProps.setHighlightedMountain}
						/>
					</div>
					

					<div class="place_container">
						<div >
							{/*<Button text="Arkiverade berg" onClick={ () => {this.props.setActiveView("archive")}} />*/}
						</div>

						<div class="button_container_two">
							{/*<Button text="Complicated timer" />*/}
							<Button text="Simple timer" onClick={ () => {this.props.displaySubcomponent("simpleTimerSetup")}} />
							<Button text="New mountain" onClick={ () => {this.props.displaySubcomponent("newMountain")}} />
						</div>
					</div>

					
				</div>
			</div>
		)
	}
}

export default Home
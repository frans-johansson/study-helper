import React, { Component } from 'react';
import '../Stylesheets/home.scss';
import RecentProgress from '../Components/RecentProgress.js'
import MountainList from '../Components/MountainList.js'
import Button from '../Components/Button.js'



class Home extends Component {
	render() {
		return(
			<div className="page_container">
				<h1>HEM</h1>
			
				<RecentProgress />

				<MountainList className="view_container" 
					displaySubcomponent={this.props.displaySubcomponent}
					clearSubcomponent={this.props.clearSubcomponent}
					mountains={this.props.viewProps.mountains}
					removeMountain={this.props.viewProps.removeMountain}
					setHighlightedMountain={this.props.viewProps.setHighlightedMountain}
				/>
			
				<div >
					{/*<Button text="Arkiverade berg" onClick={ () => {this.props.setActiveView("archive")}} />*/}
				</div>

				<div className="fixed center_on_page has_subcomponent">
					{this.props.children}
			    </div>

			    <div className="fixed as_row">
					{/*<Button text="Complicated timer" />*/}
					<Button text="Snabb timer" onClick={ () => {this.props.displaySubcomponent("simpleTimerSetup")}} />
					<Button text="Nytt berg" onClick={ () => {this.props.displaySubcomponent("newMountain")}} />
				</div>
			</div>
		)
	}
}

export default Home
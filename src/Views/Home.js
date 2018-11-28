import React, { Component } from 'react';

import RecentProgress from '../Components/RecentProgress.js'
import MountainList from '../Components/MountainList.js'
import Button from '../Components/Button.js'


class Home extends Component {
	render() {
		return(
			<div>
				<h1>HOME</h1>
				<div>
					<RecentProgress />
				</div>

				<div>
					<MountainList
						displaySubcomponent={this.props.displaySubcomponent}
						clearSubcomponent={this.props.clearSubcomponent}
						mountains={this.props.viewProps.mountains}
						removeMountain={this.props.viewProps.removeMountain}
						setHighlightedMountain={this.props.viewProps.setHighlightedMountain}
					/>
				</div>

				<div>
					{/*<Button text="Arkiverade berg" onClick={ () => {this.props.setActiveView("archive")}} />*/}
				</div>

				<div>
					{/*<Button text="Complicated timer" />*/}
					<Button text="Simple timer" />
					<Button text="New mountain" onClick={ () => {this.props.displaySubcomponent("newMountain")}} />
				</div>

				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Home
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
						mountains={this.props.mountains}
						updateMountainList={this.props.updateMountainList}
						removeMountain={this.props.removeMountain}
					/>
				</div>

				<div>
					<Button text="Archive" onClick={this.props.changeView} />
				</div>

				<div>
					<Button text="Complicated timer" />
					<Button text="Simple timer" />
					<Button text="New mountain" onClick={this.props.toggleNewMountain} />
				</div>
			</div>
		)
	}
}

export default Home
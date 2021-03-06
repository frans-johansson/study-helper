import React, { Component } from 'react';

import Button from '../Components/Button'

class Archive extends Component {
	render() {
		return(
			<div>
				<h1>ARCHIVE</h1>
				<Button text="Home" onClick={ () => {this.props.setActiveView("home")}} />

				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Archive
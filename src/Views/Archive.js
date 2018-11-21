import React, { Component } from 'react';

import Button from '../Components/Button'

class Archive extends Component {
	render() {
		return(
			<div>
				<h1>ARCHIVE</h1>
				<Button text="Home" onClick={this.props.changeView} />
			</div>
		)
	}
}

export default Archive
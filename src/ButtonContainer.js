import React, { Component } from 'react'

class ButtonContainer extends Component {
	render() {
		return(
			<div className="ButtonContainer">
				{this.props.children}
			</div>
		)
	}
}

export default ButtonContainer
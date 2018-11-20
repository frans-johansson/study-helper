import React, { Component } from 'react'

class Clickable extends Component {
	render() {
		return(
			<div className="ClickWrapper">
				<div className="Clickable" onClick={this.props.onClick}/>
				<p>{this.props.text}</p>
			</div>
		)
	}
}

export default Clickable
import React, { Component } from 'react'

class Clickable extends Component {
	render() {
		return(
			<div className="ClickWrapper">
				<div className="Clickable" onClick={this.props.onClick}>
					<div className={this.props.className} style={this.props.style}/>
				</div>
				<p>{this.props.text}</p>
			</div>
		)
	}
}

export default Clickable
import React, { Component } from 'react'
import '../Stylesheets/home.scss';
import position from '../svg/position.svg'

class MountainClimber extends Component {
	
	render() {

        let divStyle = {
        	left: 0,
        	bottom: 0,
        	width: 10,
   			height: 10,
        }

		if(this.props.percentage>0){
		 	divStyle = {
            	left: 215*(this.props.percentage/this.props.goal),
            	bottom: 499*(this.props.percentage/this.props.goal),
            	backgroundColor: `${this.props.mountain}`,  // Detta funkar inte, men är en bit på vägen
   				backgroundImage: "url(" + {position} + ")",
   				backgroundSize: 'cover',
   				width: 10,
   				height: 10,				// BackgroundColor är färgen, det borde vara svg-filen som är färgen
        	};
   		 }
		return(
			<div className="mountain_climber_container">
				<div className="mountain_position" style={divStyle} />
			</div>
		)
	}
}

export default MountainClimber
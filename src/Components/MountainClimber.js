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
        				// Denna länk: https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91

		if(this.props.percentage>0){
		 	divStyle = {
            	left: 215*(this.props.percentage/this.props.goal),
            	bottom: 499*(this.props.percentage/this.props.goal),
            	backgroundColor: `${this.props.mountain}`,
   				//backgroundImage: 'url(/static/media/position.4f7a9f24.svg)',
   				backgroundSize: 'cover',
   				width: 20,
   				height: 20,
   				borderRadius: 100,
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
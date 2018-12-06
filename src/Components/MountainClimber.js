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
            	//backgroundColor: `${this.props.mountain}`,  // Detta funkar inte, men är en bit på vägen
   				backgroundImage: 'url(/static/media/position.4f7a9f24.svg)',
   				backgroundSize: 'cover',
   				width: 20,
   				height: 30,				// BackgroundColor är färgen, det borde vara svg-filen som är färgen
        	};
   		 }
		return(
			<div className="mountain_climber_container">
				{/* <svg width="24" height="24" viewBox="0 0 216 146"
			          pointerEvents="none">
			          <title>{position}</title>
			        <path fill={this.props.mountain}
			          d="M172.77 123.025L144.825 95.08c6.735-9.722z..."/>
			      </svg>*/}
				<div className="mountain_position" style={divStyle} />
			</div>
		)
	}
}

export default MountainClimber
import React, { Component } from 'react'
import '../Stylesheets/home.scss';

class ProgressBarExample extends Component {
	
	render() {

        let divStyle

		if(this.props.percentage>0){
		 	divStyle = {
            	width: 430*(this.props.percentage/this.props.goal),
        	};
   		 }
   		 else{
	     	divStyle = {
	            width: 0,
	        };
    	}
		return(
			<div >
				<div class="progress_bar">
					<div class="filler" style={divStyle} />
				</div>
			</div>
		)
	}
}

export default ProgressBarExample
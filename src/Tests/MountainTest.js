import React, { Component } from 'react';

import { MountainDeclaration } from '../MountainDataManager.js'
import MountainList from '../MountainList.js'

class MountainTest extends Component {
	render() {
		return(
			<div>
				<MountainDeclaration />
				<MountainList />
			</div>
		)
	}
}

export default MountainTest
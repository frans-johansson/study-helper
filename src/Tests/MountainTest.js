import React, { Component } from 'react';

import MountainDeclaration from '../MountainDataManager.js'
import MountainList from '../MountainList.js'

class MountainTest extends Component {

	constructor() {
		super()

		this.updateMountainList = this.updateMountainList.bind(this)
		this.removeMountain = this.removeMountain.bind(this)

		this.state = {
			mountainList: '',
		}
	}

	componentWillMount() {
		this.updateMountainList()
	}

	updateMountainList() {
		let updatedList = JSON.parse(window.localStorage.getItem("mountains"))
  		if(!updatedList)
    		updatedList = []

		this.setState({
			mountainList: updatedList,
		})
	}

	removeMountain(key) {
		let remainingMountains = this.state.mountainList.filter((m) => m.id != key)

		window.localStorage.setItem("mountains", JSON.stringify(remainingMountains))

		this.updateMountainList()
	}

	render() {
		return(
			<div>
				<MountainDeclaration updateMountainList={this.updateMountainList} />
				<MountainList mountains={this.state.mountainList} removeMountain={this.removeMountain} />
			</div>
		)
	}
}

export default MountainTest
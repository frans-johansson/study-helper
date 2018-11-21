import React, { Component } from 'react';
import MountainData from './MountainData.js'

class MountainForm extends Component {
  render() {
    return(
        <form onSubmit={this.props.onSubmit} method="get">
          <label>
            Name:
            <input type="text" name="name" onChange={this.props.onChange} />
            Goal:
            <input type="number" name="goal" onChange={this.props.onChange} />
            End date:
            <input type="text" name="date" onChange={this.props.onChange} />
            Color:
            <input type="text" name="color" onChange={this.props.onChange} />
          </label>

          <input type="submit" value="Submit" />
        </form>
    )
  }
}

// Detta är copypastat från reactjs.org
// Och sedan lite redigerat
class MountainDeclaration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      goal: 0,
      date: '',
      color: '', //Hur gör vi detta?
      studied: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates state with entered data
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  // Sends data away into storage (woosh)
  handleSubmit(event) {
    let {name, goal, date, color} = this.state

    // Try to get the array from local storage. If it's not there, create an empty array.
    let mountains = JSON.parse(window.localStorage.getItem("mountains"))
    if (!mountains)
      mountains = []

    // Create a new mountain object and place it at the end of the array
    let newMountain = new MountainData(name, goal, date, color, Date.now())
    mountains.push(newMountain)

    // Updates the array in local storage
    window.localStorage.setItem("mountains", JSON.stringify(mountains));

    // Updates the app state with the new mountain
    this.props.updateMountainList()

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Nytt Berg</h1>
        <MountainForm onChange={this.handleChange} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}



export default MountainDeclaration

// Bra idé: CurrentKey ligger i local storage och kan hämtas därifrån varje gång
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

class MountainEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      goal: 0,
      date: '',
      color: '', //Hur gör vi detta?
      studied: 0,
      visible: false,
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

    let m = new MountainData(name, goal, date, color, key)

    window.localStorage.setItem(`mountain(${key})`, JSON.stringify(m));

    event.preventDefault();
  }

  render() {
    if (!visible)
      return(<div/>)

    return (
      <div>
        <h1>Redigera Berg</h1>
        <MountainForm onChange={this.handleChange} onSubmit={this.handleSubmit} />
      </div>
    );
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
    let key = window.localStorage.getItem("key")

    if (!key)
      key = 0

    let m = new MountainData(name, goal, date, color, key)

    window.localStorage.setItem(`mountain(${key})`, JSON.stringify(m));
    key++
    window.localStorage.setItem("key", key)

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

function getMountains() {
  let amount = window.localStorage.getItem("key")

  if (!amount)
    amount = 0

  console.log(amount)

  let mountains = []

  for (let i = 0; i < amount; ++i) {
    let mountain = JSON.parse(window.localStorage.getItem(`mountain(${i})`))

    if (!mountain)
      continue

    mountain.key = i
    mountains[i] = mountain
  }

  return mountains.filter(Boolean)
}

function removeMountain(key) { 
  window.localStorage.removeItem(`mountain(${key})`)
}

export {MountainDeclaration, MountainEdit, getMountains, removeMountain}

// Bra idé: CurrentKey ligger i local storage och kan hämtas därifrån varje gång
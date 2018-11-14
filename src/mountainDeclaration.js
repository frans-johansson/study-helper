import React, { Component } from 'react';
import MountainData from './saveMountain.js'

// Detta är copypastat från reactjs.org
// Och sedan lite redigerat
class MountainDeclaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      goal: 0,
      date: '',
      color: '', //Hur gör vi detta?
      studied: 0,
      currentKey: 0,      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.name);
    let m = new MountainData(this.state.name, this.state.goal, this.state.date, this.state.color, this.state.currentKey);
    window.localStorage.setItem(this.state.currentKey, JSON.stringify(m));
    
    this.setState({
      currentKey: this.state.currentKey + 1,
    });

    let test = window.localStorage.getItem(0)
    console.log(test)

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.state.name}:
          <input type="text" name="name" onChange={this.handleChange} />
          {this.state.goal}:
          <input type="number" name="goal" onChange={this.handleChange} />
          {this.state.date}:
          <input type="text" name="date" onChange={this.handleChange} />
          {this.state.color}:
          <input type="text" name="color" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MountainDeclaration

// Bra idé: CurrentKey ligger i local storage och kan hämtas därifrån varje gång
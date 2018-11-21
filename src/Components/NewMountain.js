import React, { Component } from 'react';

class NewMountain extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      goal: 0,
      date: '',
      color: '', //Hur gör vi detta?
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit() {
    console.log("Handling submit...")
    console.log(this.state)

    let {name, goal, date, color} = this.state

    this.props.addMountain(name, goal, date, color, Date.now())
    this.props.toggleNewMountain()
  }

  render() {
    return(
        <div>
          <h2>NEW MOUNTAIN</h2>
          <form onSubmit={this.handleSubmit} method="get">
            <label>
              Name:
              <input type="text" name="name" onChange={this.handleChange} />
              Goal:
              <input type="number" name="goal" onChange={this.handleChange} />
              End date:
              <input type="text" name="date" onChange={this.handleChange} />
              Color:
              <input type="text" name="color" onChange={this.handleChange} />
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>
    )
  }
}

export default NewMountain
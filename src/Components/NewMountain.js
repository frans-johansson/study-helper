import React, { Component } from 'react';
import Button from '../Components/Button.js'

class NewMountain extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      goal: 0,
      date: '',
      color: JSON.parse(window.localStorage.getItem("colors")).shift(),
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

    this.props.subcomponentProps.addMountain(name, goal, date, color, Date.now())
    this.props.clearSubcomponent()
  }


  render() {
    return(
        <div class="sub_page_container">
          <h2>NYTT BERG</h2>
          <form onSubmit={this.handleSubmit} method="get">
            <label>
              Namn:
              <input type="text" minlength="2" name="name" onChange={this.handleChange} />
              Mål:
              <input type="number" min="0" name="goal" onChange={this.handleChange} />
              Slutdatum:
              <input type="date" name="date" onChange={this.handleChange} />
            </label>

            <input type="submit" value="Lägg till" disabled={!this.state.name || !this.state.goal || !this.state.date}/>
          </form>

          <Button text="Hem" onClick={ () => {this.props.clearSubcomponent()}} />
        </div>
    )
  }
}

export default NewMountain
import React, { Component } from 'react';
import Button from '../Components/Button.js'
import onClickOutside from 'react-onclickoutside'

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

    let {name, goal, date, color} = this.state

    this.props.subcomponentProps.addMountain(name, goal, date, color, Date.now())
    this.props.clearSubcomponent()
  }

  todayDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yy = today.getFullYear();

    if(dd<10)
    {
      dd = "0"+dd
    }
    if(mm<10)
    {
      mm = "0"+mm
    }
    today = yy + '-' + mm + '-' + dd;

    return today

  }

  handleClickOutside = () => {
    this.props.clearSubcomponent()
  }

  render() {

    let numMountains = 10 - JSON.parse(window.localStorage.getItem("colors")).length
    let thisColor = JSON.parse(window.localStorage.getItem("colors")).shift()

    return(
        <div>
          <h2>SKAPA BERG</h2> 
          <h3>Nr {numMountains+1}/10</h3>
          <form onSubmit={this.handleSubmit} method="get">
           <label className="mountain_setup">
            <div>
              <label>Ämne</label>
              <input type="text" minLength="2" maxLength="10" name="name" onChange={this.handleChange} />
            </div>
            <div>
               <label>Mål</label>
               <input type="number" min="0" name="goal" onChange={this.handleChange} />
               <label>Timmar</label>
            </div>
            <div>
                <label>Slutdatum</label>
              <input id="datefield" type="date" name="date" min={this.todayDate()} onChange={this.handleChange} />
            </div>
            </label>


            <input type="submit" value="" disabled={!this.state.name || !this.state.goal || !this.state.date} />
    

          </form>
              <label>Ditt berg får färgen:</label>

           

            <div>
                <div className="subjectColor" style={{backgroundColor: thisColor,}}/>
            </div>

            <Button className="backButton blue" positioning="right-absolute" onClick={ () => {this.props.clearSubcomponent()}} />
        </div>
    )
  }
}

export default onClickOutside(NewMountain)

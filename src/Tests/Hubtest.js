import React, { Component } from 'react';

import MountainTest from './MountainTest.js'
import TimerTest from './TimerTest.js'
import HomeTest from './HomeTest.js'
import ArchiveTest from './ArchiveTest.js'
import TimerCTest from './TimerCTest.js'

import Button from '../Components/Button.js'


class  Hubtest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: " "};

   
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState(state => ({
      isToggleOn: e
    }));
  }
 

  render() {

    if(this.state.isToggleOn=="mountain"){
      
      return(
      <div>
       <MountainTest/>
       <Button text="Tillbaka" onClick={this.handleClick.bind(this, "back")}/>
      </div>);
    }
     if(this.state.isToggleOn=="back"){
      
      return(
      <div>
       <HomeTest/>
       
      </div>);
    }
     if(this.state.isToggleOn=="timer"){
      
      return(
      <div>
       <p> finns inte </p>
       <Button text="Tillbaka" onClick={this.handleClick.bind(this, "back")}/>

       
      </div>);
    }
      if(this.state.isToggleOn=="Archive"){
      
      return(
      <div>
       <p> finns inte </p>
       <Button text="Tillbaka" onClick={this.handleClick.bind(this, "back")}/>
       <ArchiveTest/>
       
      </div>);
    }

    if(this.state.isToggleOn=="timertwo"){
      
      return(
      <div>
       <p> finns inte </p>
       <Button text="Tillbaka" onClick={this.handleClick.bind(this, "back")}/>
       <TimerCTest/>

       
      </div>);
    }


    return (
     <div>
      <Button text="lägg till berg" onClick={this.handleClick.bind(this, "mountain")}/>

      <Button text="timern" onClick={this.handleClick.bind(this, "timer")}/>

      <Button text="Arkiverade berg" onClick={this.handleClick.bind(this, "Archive")}/>

      <Button text="Kalender timer" onClick={this.handleClick.bind(this, "timertwo")}/>

       </div>

      
      
    );
  }
}

export default Hubtest;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MountainData from './saveMountain.js'
import MountainDeclaration from './mountainDeclaration.js'

class App extends Component {
  render() {

    /*let m = new MountainData (
      "Hello", "My", "Name", "Is", "Arne"
    )

    let n = new MountainData (
      "Analys II", 3, "2018-11-19", "Green", 2
    )


    window.localStorage.setItem('mountain1', JSON.stringify(n));

    let Mountain1 = window.localStorage.getItem('mountain1');

    let aha = JSON.parse(Mountain1);

    console.log(m)
    console.log(aha)*/

    return (
      <div>
      <MountainDeclaration />
      </div>
    )
  }
}

export default App;

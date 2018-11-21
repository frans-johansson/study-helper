import React, { Component } from 'react';

import Button from './Button.js'
import MountainList from './Mountain.js'
import ButtonContainer from './ButtonContainer.js'

class HomeTest extends Component {
  render() {
    return(
      <div>
        <MountainList/>
      
        <ButtonContainer>
          <Button text="Hej" onClick={() => {alert("a")}}/>
        </ButtonContainer>
      </div>
    )
  }
}

export default HomeTest
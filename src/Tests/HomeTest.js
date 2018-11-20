import React, { Component } from 'react';

import Button from '../Components/Button.js'
import MountainList from '../MountainList.js'
import ButtonContainer from '../Components/ButtonContainer.js'

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
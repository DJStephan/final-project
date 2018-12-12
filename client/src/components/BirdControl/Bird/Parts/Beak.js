import React, {Component} from 'react'
import styled from 'styled-components'
import posed from "react-pose";
import Image from './Image'

import beak from '../Images/Beak.png'

const MainPose = posed.div({
  normal: {
    transform: 'translate(0%, 0%) rotate(0deg) scaleY(1)'
  },
  happy: {
    transform: 'translate(-8%, -3%) rotate(10deg) scaleY(1)'
  },
  sad: {
    transform: 'translate(6%, -3%) rotate(-15deg) scaleY(1)'
  },
  angry: {
    transform: 'translate(6%, -3%) rotate(-15deg) scaleY(1)'
  }
})

const MainContainer = styled(MainPose)`
  position: absolute;
  height: 100%;
  width: 100%;
`

class Beak extends Component {

  render() {

    return (
      <MainContainer pose={this.props.expression} style={{zIndex: this.props.zIndex}}>
        <Image
          top={-25}
          left={-30}
          scaleX={0.2}
          scaleY={0.15}
          rotate={0}
          zIndex={this.props.zIndex}
          src={beak} />
      </MainContainer>
    );
  }
}

export default Beak
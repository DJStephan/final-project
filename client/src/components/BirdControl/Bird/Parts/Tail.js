import React, {Component} from 'react'
import styled from 'styled-components'
import posed from "react-pose";
import Image from './Image'

import tail from '../Images/Tail.png'

const MainPose = posed.div({
  normal: {
    transform: 'translate(0%, 0%) rotate(0deg) scaleY(1)'
  },
  happy: {
    transform: 'translate(-3%, 3%) rotate(-20deg) scaleY(1)'
  },
  sad: {
    transform: 'translate(3%, 0%) rotate(20deg) scaleY(1)'
  },
  angry: {
    transform: 'translate(-3%, 3%) rotate(-20deg) scaleY(1)'
  }
})

const MainContainer = styled(MainPose)`
  position: relative;
  height: 100%;
  width: 100%;
`

class Tail extends Component {
//expression
  render() {

    return (
      <MainContainer pose={this.props.expression}>
        <Image
          top={35}
          left={43}
          scaleX={0.3}
          scaleY={0.15}
          rotate={0}
          zIndex={this.props.zIndex}
          src={tail} />
      </MainContainer>
    );
  }
}

export default Tail
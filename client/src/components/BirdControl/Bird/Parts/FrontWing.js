import React, {Component} from 'react'
import posed from "react-pose";
import styled, {keyframes} from 'styled-components'

import Image from './Image'

import wing from '../Images/Wing.png'

const Idle = keyframes`
  0%{
    transform: translate(0%, 0%) rotate(0deg) scaleX(1);
  }
  50%{
    transform: translate(0%, 0%) rotate(-10deg) scaleX(1);
  }
  100%{
    transform: translate(0%, 0%) rotate(0deg) scaleX(1);
  }
`

const AnimationCycle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  animation: ${Idle} 2s linear infinite;
`

const ActionPose = posed.div({
  normal:{
    transform: 'translate(0%, 0%) rotate(0deg)'
  },
  happy:{
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'translate(25%, 10%) rotate(-90deg)',
        'translate(25%, 10%) rotate(-90deg)',
        to],
      times: [0, 0.2, 0.8, 1],
      duration: 1300
    })
  },
  sad:{
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'translate(0%, -10%) rotate(50deg)',
        'translate(0%, -10%) rotate(50deg)',
        to],
      times: [0, 0.2, 0.8, 1],
      duration: 1300
    })
  },
  angry:{
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'translate(25%, 10%) rotate(-90deg)',
        'translate(25%, 10%) rotate(-90deg)',
        to],
      times: [0, 0.2, 0.8, 1],
      duration: 1300
    })
  }
})

const ActionDiv = styled(ActionPose)`
  position: absolute;
  width: 100%;
  height: 100%;
`


class FrontWing extends Component {
  render() {

    return (
      <ActionDiv pose={this.props.action} onPoseComplete={this.onPoseComplete} style={{zIndex: this.props.zIndex}}>
        <AnimationCycle style={{zIndex: this.props.zIndex}}>
          <Image
            top={10}
            left={30}
            scaleX={0.5}
            scaleY={0.5}
            rotate={0}
            zIndex={this.props.zIndex}
            src={wing} />
        </AnimationCycle>
      </ActionDiv>
    );
  }
}

export default FrontWing
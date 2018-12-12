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
    transform: translate(0%, 3%) rotate(10deg) scaleX(1);
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
    transform: 'translate(0%, 0%) rotate(0deg)',
  },
  happy:{
    transform: 'translate(0%, 0%) rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'translate(25%, 10%) rotate(50deg)',
        'translate(25%, 10%) rotate(50deg)',
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
        'translate(0%, 0%) rotate(-10deg)',
        'translate(0%, 0%) rotate(-10deg)',
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
        'translate(25%, 10%) rotate(50deg)',
        'translate(25%, 10%) rotate(50deg)',
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

class BackWing extends Component {

  render() {
    return (
      <ActionDiv pose={this.props.action} style={{zIndex: this.props.zIndex}}>
        <AnimationCycle style={{zIndex: this.props.zIndex}}>
          <Image
            top={10}
            left={-35}
            scaleX={-0.45}
            scaleY={0.45}
            rotate={-20}
            zIndex={this.props.zIndex}
            src={wing} />
        </AnimationCycle>
      </ActionDiv>
    );
  }
}

export default BackWing
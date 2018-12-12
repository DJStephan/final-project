import React, {Component} from 'react'
import posed from "react-pose";
import styled from 'styled-components'

import Image from './Image'

import backFoot from '../Images/BackFoot.png'

const AnimationCycle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
        'translate(0%, 0%) rotate(40deg)',
        'translate(0%, 0%) rotate(40deg)',
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
        'translate(0%, 0%) rotate(10deg)',
        'translate(0%, 0%) rotate(10deg)',
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
        'translate(0%, 0%) rotate(20deg)',
        'translate(0%, 0%) rotate(20deg)',
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
class BackFoot extends Component {

  render() {
    return (
      <ActionDiv pose={this.props.action} style={{zIndex: this.props.zIndex}}>
        <AnimationCycle style={{zIndex: this.props.zIndex}}>
          <Image
            top={40}
            left={-30}
            scaleX={0.4}
            scaleY={0.15}
            rotate={0}
            zIndex={this.props.zIndex}
            src={backFoot} />
        </AnimationCycle>
      </ActionDiv>
    );
  }
}

export default BackFoot
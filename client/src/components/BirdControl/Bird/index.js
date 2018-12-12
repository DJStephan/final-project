import React, {Component} from 'react'
import posed from "react-pose";
import styled, {keyframes} from 'styled-components'

import { BackFoot, BackWing, Beak, Body, Eye, FrontFoot, FrontWing, Tail } from './Parts'


const MainBirdPose = posed.div({
  enter:{
    height: '100%',
    transition: {duration: 100}
  },
  exit:{
    height: '0%',
    transition:  ({ from, to }) => ({
      type: 'keyframes',
      values: [
        from,
        '100%',
        to],
      times: [0, 0.7, 1],
      duration: 500
    })
  }
})

const MainBirdMovePose = posed.div({
  enter: {
    top: '0%',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [
        from,
        '0%',
        '-18%',
        '-20%',
        '-18%',
        to],
      times: [0, 0.2, 0.5, 0.6, 0.7, 1],
      duration: 500
    })
  },
  exit: {
    top: '120%',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [
        from,
        '-18%',
        '-20%',
        '-18%',
        '0%',
        to],
      times: [0, 0.2, 0.5, 0.6, 0.7, 1],
      duration: 500
    })
  }
})

const Idle = keyframes`
  0%{
    transform: translate(0%, 0%) rotate(0deg) scaleY(1);
  }
  50%{
    transform: translate(0%, 3%) rotate(0deg) scaleY(0.95);
  }
  100%{
    transform: translate(0%, 0%) rotate(0deg) scaleY(1);
  }
`

const AnimationCycle = styled(MainBirdPose)`
  position: absolute;
  width: 100%;
  height: 100%;

  animation: ${Idle} 2s linear infinite;
`

const BirdMoveContainer = styled(MainBirdMovePose)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const ActionPose = posed.div({
  normal:{
  },
  happy:{
    transform: 'rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'rotate(20deg)',
        'rotate(20deg)',
        to],
      times: [0, 0.2, 0.8, 1],
      duration: 1300
    })
  },
  sad:{
    transform: 'rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'rotate(-10deg)',
        'rotate(-10deg)',
        to],
      times: [0, 0.2, 0.8, 1],
      duration: 1300
    })
  },
  angry:{
    transform: 'rotate(0deg)',
    transition: ({ from, to }) => ({
      type: 'keyframes',
      values: [from,
        'rotate(-20deg)',
        'rotate(-20deg)',
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

class BirdImage extends Component {

  render() {
    return (
      <BirdMoveContainer
        pose={this.props.enter? 'enter' : 'exit'} >
        <AnimationCycle pose={this.props.enter? 'enter' : 'exit'}
          style={{zIndex: this.props.zIndex}}>
          <ActionDiv pose={this.props.action} style={{zIndex: this.props.zIndex}}>
            <BackFoot
              action={this.props.action}
              zIndex={this.props.zIndex + 1}/>
            <BackWing
              action={this.props.action}
              zIndex={this.props.zIndex}/>
            <Beak
              action={this.props.action}
              expression={this.props.expression}
              zIndex={this.props.zIndex + 3}/>
            <Body
              action={this.props.action}
              zIndex={this.props.zIndex + 2}/>
            <Eye
              action={this.props.action}
              expression={this.props.expression}
              zIndex={this.props.zIndex + 3}/>
            <FrontFoot
              action={this.props.action}
              zIndex={this.props.zIndex + 4}/>
            <FrontWing
              action={this.props.action}
              zIndex={this.props.zIndex + 4}/>
            <Tail
              action={this.props.action}
              expression={this.props.expression}
              zIndex={this.props.zIndex + 1}/>
          </ActionDiv>
        </AnimationCycle>
      </BirdMoveContainer>
    );
  }
}

export default BirdImage;
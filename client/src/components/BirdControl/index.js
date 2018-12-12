import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import styled from 'styled-components'
import posed from "react-pose";
import BirdImage from './Bird'

const MainPose = posed.div({
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
    transition: ({
      delay: 100,
      duration: 1000
    })
  }
})

const MainContainer = styled(MainPose)`
  position: relative;
  height: 100%;
  width: 100%;

  &:hover{
    cursor: grab
  }
`

const HideOverFlow = styled.div`
  position: absolute;
  height: 150%;
  width: 160%;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  overflow: hidden;
`
const InsideHideOverFlow = styled.div`
  position: relative;
  height: 65%;
  width: 60%;

  top: 20%;
  left: 20%;
`

const ActionPose = posed.div({
  normal:{
    'background-color': 'black',
    transition: { duration: 1300 }
  },
  happy:{
    'background-color': 'yellow',
    transition: { duration: 1300 }
  },
  sad:{
    'background-color': 'blue',
    transition: { duration: 1300 }
  },
  angry:{
    'background-color': 'red',
    transition: { duration: 1300 }
  }
})

const ActionDiv = styled(ActionPose)`
  position: absolute;
  background-color: black;
  width: 0%;
  height: 0%;
`

class Bird extends Component {
  state = {
    expression: 'normal',

    action: 'normal',

    drag: false,
    petting: false,
    pet: 0,
    click: 0
  }

  handleActionReset = () => {
    switch(this.state.action) {
      default:
        this.setState({action: 'normal'})
        break
      case 'normal':
        break
    }
  }

  petOrClick = () => {
    if(this.state.action !== 'angry') {
      if(this.state.drag) {
        this.setState({petting: true, expression: 'happy'})
      } else {
        if(this.state.action !== 'angry') {
          if(this.state.click > 5) {
            this.setState({click: 0, expression: 'angry', action: 'angry'})
          } else {
            this.setState({click: this.state.click + 1})
          }
        }
      }
    }
    this.setState({drag: false})
  }

  handleMouseMove = () => {
    if(this.state.petting && this.state.action !== 'angry') {
      if(this.state.pet > 100) {
        this.setState({pet: 0, action: 'happy', expression: 'happy'})
      } else {
        this.setState({pet: this.state.pet + 1})
      }
    }
  }

  handleMouseDown = () => {
    this.setState({drag: true})
    setTimeout(this.petOrClick, 900 )
  }

  handleMouseUp = () => {
    this.setState({drag: false, petting: false})
    if(this.state.action !== 'angry' && this.state.action !=='happy') {
      this.setState({expression: 'normal'})
    }
  }

  componentDidUpdate(prevProp) {
    if(prevProp.error !== this.props.error && this.state.action !== 'sad') {
      if(this.props.error !== null)
        this.setState({action: 'sad', expression: 'sad'})
    } else if (prevProp.success !== this.props.success && this.state.action !=='happy') {
      if(this.props.success !== null)
        this.setState({action: 'happy', expression: 'happy'})
    }
  }

  render() {
    return (
      <div style={{position: 'absolute', height: (this.props.size * 1.4) + 'px', width: (this.props.size * 1.0) + 'px', zIndex: this.props.zIndex}}>
        <MainContainer
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onTouchStart={this.handleMouseDown}
          onTouchEnd={this.handleMouseUp}
          onTouchMove={this.handleMouseMove}
          pose={this.props.enter ? 'visible' : 'hidden'}
          style={{
            top: this.props.y,
            left: this.props.x,
            transform: 'scaleX(1)'}} >
          <HideOverFlow>
            <InsideHideOverFlow>
              <BirdImage
                action={this.state.action}
                expression={this.state.expression}
                enter={this.props.enter}
                zIndex={this.props.zIndex}/>
            </InsideHideOverFlow>
          </HideOverFlow>
        </MainContainer>
        <ActionDiv pose={this.state.action} onPoseComplete={this.handleActionReset}>
        </ActionDiv>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  success: state.success
})

export default connect(mapStateToProps)(Bird)
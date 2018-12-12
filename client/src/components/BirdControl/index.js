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

  &:hover{
    cursor: grab
  }
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
    timeout: null,

    drag: false,
    petting: false,
    pet: 0,
    click: 0
  }

  //At end of an action reset pose
  handleActionReset = () => {
    switch(this.state.action) {
      default:
        this.setState({action: 'normal'})
        break
      case 'normal':
        break
    }
  }

  //Determine if user is petting or clicking the penguin
  petOrClick = () => {
    this.setState({timeout: null})
    //If penguin is not angry, you can interact with it
    if(this.state.action !== 'angry') {
      //If your dragging you are petting, and penguin is happy with pets
      if(this.state.drag) {
        this.setState({petting: true, expression: 'happy'})
      } else {
        //If you are clicking penguin is not amused and will get angry if clicked too much
        if(this.state.click > 5) {
          this.setState({click: 0, expression: 'angry', action: 'angry'})
        } else {
          this.setState({click: this.state.click + 1, expression: 'sad'})
        }
      }
    }
  }

  //If mouse is moiving
  handleMouseMove = () => {
    //If you are petting, penguin will get happy
    if(this.state.petting && this.state.action !== 'angry') {
      if(this.state.pet > 100) {
        this.setState({pet: 0, action: 'happy', expression: 'happy'})
      } else {
        this.setState({pet: this.state.pet + 1})
      }
    }
  }

  //Set drag to true, and determine if user is petting or clicking by time
  handleMouseDown = () => {
    //If there is a timeout currently running (happens on rapid click)
    //Clear timeout and set click
    if(this.state.timeout !== null) {
      clearTimeout(this.state.timeout)
      //If penguin is not angry, you can interact with it
      if(this.state.action !== 'angry') {
        //If you are clicking penguin is not amused and will get angry if clicked too much
        if(this.state.click > 5) {
          this.setState({click: 0, expression: 'angry', action: 'angry'})
        } else {
          this.setState({click: this.state.click + 1, expression: 'sad'})
        }
      }
    }
    //Set up drag and stuff
    if(!this.state.drag) {
      this.setState({drag: true})
      this.setState({timeout: setTimeout(this.petOrClick, 150 )})
    }
  }

  //On mouse up reset
  handleMouseUp = () => {
    this.setState({drag: false, petting: false})
    if(this.state.action !== 'angry' && this.state.action !=='happy' && this.state.expression !== 'sad') {
      this.setState({expression: 'normal'})
    }
  }

  //On update, if there is an success or error message, express happiness or sadness
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
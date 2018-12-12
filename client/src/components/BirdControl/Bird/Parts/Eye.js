import React, {Component} from 'react'
import Image from './Image'

import eyeOpen from '../Images/EyeOpen.png'
import eyeClose from '../Images/EyeClose.png'
import eyeAngry from '../Images/EyeAngry.png'
import eyeHappy from '../Images/EyeHappy.png'
import eyeSad from '../Images/EyeSad.png'


class Eye extends Component {
  state = {
    eyeOpen: true,
    blinkTimeout: null
  }

  blink() {
    this.setState({eyeOpen: false})
    this.setState({blinkTimeout: setTimeout(
      function() {
          this.setState({eyeOpen: true});
      }
      .bind(this),
      100
    )})
  }

  clearBlinkTimeout() {
    clearTimeout(this.state.blinkTimeout)
  }

  componentDidMount() {
    setInterval(() => this.blink(), 3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.clearBlinkTimeout()
  }

  render() {
    let eye = eyeOpen
    switch(this.props.expression) {
      default:
      case 'normal':
        eye = eyeOpen
        break
      case 'angry':
        eye = eyeAngry
        break
      case 'happy':
        eye = eyeHappy
        break
      case 'sad':
        eye = eyeSad
        break
    }
    return (
      <div style={{zIndex: this.props.zIndex}}>
        <Image
          top={-30}
          left={-5}
          scaleX={0.12}
          scaleY={0.1}
          rotate={0}
          zIndex={this.props.zIndex}
          src={this.state.eyeOpen? eye: eyeClose} />
      </div>
    );
  }
}

export default Eye
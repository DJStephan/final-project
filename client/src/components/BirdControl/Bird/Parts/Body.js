import React, {Component} from 'react'

import Image from './Image'

import body from '../Images/Body.png'

class Body extends Component {
  render() {
    return (
      <div style={{zIndex: this.props.zIndex}}>
        <Image
          top={0}
          left={0}
          scaleX={1}
          scaleY={1}
          rotate={0}
          zIndex={this.props.zIndex}
          src={body} />
      </div>
    );
  }
}

export default Body
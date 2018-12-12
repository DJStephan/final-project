import React, {Component} from 'react'


class Image extends Component {

  scale = (x, y) => {
    return 'scale(' + x + ',' + y + ')'
  }
  rotate = (angle) => {
    return 'rotate(' + angle + 'deg)'
  }

  transform = (scaleX, scaleY, rotate) => {
    return this.scale(scaleX,scaleY) + ' ' + this.rotate(rotate)
  }

  render() {

    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: this.props.zIndex}}>
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transform: this.transform(this.props.scaleX,this.props.scaleY,this.props.rotate),
            top: this.props.top + '%',
            left: this.props.left + '%',
            zIndex: this.props.zIndex}} >
          <img style={{width: '100%', height: '100%', zIndex: this.props.zIndex}} src={this.props.src} alt='not found'/>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Image;
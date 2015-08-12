const React = require('react');

const PropTypes = React.PropTypes;

import styles from './Box.less';

var Tooltip = React.createClass({

  render() {
    var pinSize = 10;
    var offset = 10;

    var box = {
      position : 'relative'
    };
    var pin = {
      position : 'absolute',
      border:  pinSize + 'px solid #ccc;',
    };
    var pinInner = {
      position : 'absolute',
      border: pinSize + 'px solid #fff',
    };

    var leftSettings = { hiddenBorders : [0,2,3], position:["+offset",null,null,-1], zeroBorder: "borderLeft"};
    var topSettings = { hiddenBorders : [0,1,3], position:[-1,null,null,"+offset"], zeroBorder: "borderTop"};
    var rightSettings = { hiddenBorders : [0,1,2], position:["+offset",-1,null,null], zeroBorder: "borderRight"};
    var bottomSettings = { hiddenBorders : [1,2,3], position:[null,null,-1,"+offset"], zeroBorder: "borderBottom"};

    var pinSettings = rightSettings;

    var borderNames = ['borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'];
    var positions = ['top','right','bottom','left'];

    for (var i = 0; i < pinSettings.hiddenBorders.length; i++) {
      var border = borderNames[pinSettings.hiddenBorders[i]];
      pin[border] = 'transparent';
      pinInner[border] = 'transparent';
    }

    for (var i = 0; i < positions.length; i++) {
      var p = pinSettings.position[i];
        if (p===null)
        continue;

      if (p=="+offset")
        p = offset;
      else if (p=="-offset")
        p = -1*offset;
      else {
        p = p * pinSize;
      }

      var pinVal = p;
      var pinInnerVal = p;
      if (pinSettings.position[i] == 1) {
        pinVal -= 1;
        pinInnerVal -= 2;
      }
      else if (pinSettings.position[i] == -1) {
        pinVal += 1;
        pinInnerVal += 2;
      }

      var pos = positions[i];
      pin[pos] = pinVal;
      pinInner[pos] = pinInnerVal;
    }
    pin[pinSettings.zeroBorder] = 0;
    pinInner[pinSettings.zeroBorder] = 0;
    return (
        <div style={box}>
          <div className={styles.inner}>
            <div style={pin} ></div>
            <div style={pinInner} ></div>
            {this.props.children}
          </div>
        </div>);
  }
});

module.exports = Tooltip;

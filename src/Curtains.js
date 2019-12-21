import React, { Component } from 'react';
import styled from 'styled-components';

const CurtainStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: 1000;
    background: black;
`;

export default class Curtains extends Component {
  render() {
    return this.props.status && <CurtainStyle/>;
  }
}

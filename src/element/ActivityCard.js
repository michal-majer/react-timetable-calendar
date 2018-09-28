import React, { Component } from 'react';
import { Resizable } from 'react-resizable';

import styled from 'styled-components';

const Card = styled.div`
  align-items: center;
  background-color: #705BCF;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: #FFF;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  display: flex;
  position: absolute;
  width: 95%;
  font-family: 'Lato', sans-serif;
  flex-direction: column;
  grid-row: span ${props => props.rowSpan || 1};
  height: ${props => `${props.width}px` || '100%'};
  margin-top: ${props => `${props.marginTop}px` || 1};
  justify-content: center;
  z-index: 2;

  :active {
      cursor: grabbing;
  }
`;

const Header = styled.h1`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: 12px;
  margin: 0;
`;

class ActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.activity.css.height,
      marginTop: props.activity.css.marginTop
    }
  }

  onResize = (event, {element, size}) => {
    this.setState({height: size.height});
    this.props.resizeActivity(this.props.activity, size.height);
  };

  onDragStart = (ev, activity) => {
    ev.dataTransfer.setData("activity", activity);
  }

  render() {
    return (
      <Resizable height={this.state.height} axis="y" onResize={this.onResize} draggableOpts={{grid: [5, 5]}}
        draggable
        onDragStart={(e) => this.onDragStart(e, this.props.activity)}
      >
        <Card width={this.state.height} marginTop={this.state.marginTop} >
          <Header>{this.props.activity.name}</Header>
          <Description>{`${this.props.activity.startAtTime} - ${this.props.activity.endAtTime} | ${this.props.activity.description}`}</Description>
        </Card>
      </Resizable>
    )
  }
}

export default ActivityCard;

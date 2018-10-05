import React, { Component } from 'react';
import { Resizable } from 'react-resizable';
import styled, { ThemeProvider } from 'styled-components';

const purpleTheme = {
  color: '#FFF',
  backgroundColor: '#705BCF'
}

const tealTheme = {
  color: '#0D9DAD',
  backgroundColor: '#D9F9F5'
}

const Card = styled.div`
  align-items: center;
  background-color: #EDEAFF;
  border-left: 2px solid #624DC2;
  // border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: #624DC2;
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

const DISPLAY_MODE = 'display';
const EDIT_MODE = 'edit';


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

  cardInEditMode = () => (
    <Resizable height={this.state.height} width={100} axis="y" onResize={this.onResize} draggableOpts={{grid: [5, 5]}}>
      <Card width={this.state.height} marginTop={this.state.marginTop} >
        <Header>{this.props.activity.name}</Header>
        <Description>{`${this.props.activity.startAtTime} - ${this.props.activity.endAtTime} | ${this.props.activity.person}`}</Description>
      </Card>
    </Resizable>
  );

  cardInDisplayMode = () => (
      <Card width={this.state.height} marginTop={this.state.marginTop} >
        <Header>{this.props.activity.name}</Header>
        <Description>{`${this.props.activity.startAtTime} - ${this.props.activity.endAtTime} | ${this.props.activity.person}`}</Description>
      </Card>
  )

  render() {
    switch(this.props.mode) {
      case DISPLAY_MODE:
        return this.cardInDisplayMode();
      case EDIT_MODE:
        return this.cardInEditMode();
      default:
        break;
      }
  }
}

export default ActivityCard;

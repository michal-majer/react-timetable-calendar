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

  background-color: #FFF;
  border: 1px solid #DCDCDC;
  border-left: 5px solid ${props => props.color ? props.color : '#DCDCDC'};
  border-radius: 0 5px 5px 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  display: flex;
  // padding: 5px;
  position: absolute;
  width: 98%;
  font-family: 'Lato', sans-serif;
  flex-direction: row;
  grid-row: span ${props => props.rowSpan || 1};
  height: ${props => `${props.width}px` || '100%'};
  margin-top: ${props => `${props.marginTop}px` || 1};
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
  overflow: hidden;

  // :hover {
  //   background-color: ${props => props.color ? props.color : '#DCDCDC'};
  // }
`;

const Header = styled.h1`
  color: #000;
  font-size: 13px;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
`;

const Description = styled.p`
  color: #9A9A9A;
  font-size: 12px;
  margin: 0;
`;

const Category = styled.div`

color: ${props => props.checked ? "white" : "black"};
background-color: ${props => props.checked ? props.color : "white"};
box-sizing: border-box;
margin: 0;
padding: 0;
list-style: none;
display: inline-block;
line-height: 20px;
height: 22px;
padding: 0 7px;
border-radius: 4px;
border: 1px solid ${props => props.color };
font-size: 12px;
-webkit-transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
opacity: ${props => props.color === 'grey' ? 0.25 : 1};
// margin-right: 8px;
// cursor: pointer;
white-space: nowrap;
`;

const Time = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding: 0 5%;
`;

const DISPLAY_MODE = 'display';
const EDIT_MODE = 'edit';
const TAG_COLORS = ['#f50', '#2db7f5', '#87d068', '#108ee9'];


class ActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.activity.css.height,
      marginTop: props.activity.css.marginTop,
      color: TAG_COLORS[props.uniqueCategories.indexOf(props.activity.category)]
    }
  }

  onResize = (event, {element, size}) => {
    this.setState({height: size.height});
    this.props.resizeActivity(this.props.activity, size.height);
  };

  cardInEditMode = () => (
    <Resizable height={this.state.height} width={100} axis="y" onResize={this.onResize} draggableOpts={{grid: [5, 5]}}>
      {this.card()}
    </Resizable>
  );

  card = () => (
      <Card width={this.state.height} marginTop={this.state.marginTop} color={this.state.color}>
        <Time>
          {this.props.activity.startAtTime} <br />
          {this.props.activity.endAtTime}
        </Time>
        <div>
          <Header>{this.props.activity.name}</Header>
          <div>
            <Category checked={true} color={this.state.color}>{this.props.activity.category}</Category>
          </div>
        </div>
      </Card>
  );

  render() {
    switch(this.props.mode) {
      case DISPLAY_MODE:
        return this.card();
      case EDIT_MODE:
        return this.cardInEditMode();
      default:
        break;
      }
  }
}

export default ActivityCard;

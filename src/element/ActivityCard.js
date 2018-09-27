import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  align-items: center;
  background-color: #705BCF
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: #FFF;
  cursor: pointer;
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

const ActivityCard = (props) => (
  <Card width={props.activity.css.height} marginTop={props.activity.css.marginTop}>
      <Header>{props.activity.name}</Header>
      <Description>{`${props.activity.startAtTime} - ${props.activity.endAtTime} | ${props.activity.description}`}</Description>
  </Card>
);

export default ActivityCard;

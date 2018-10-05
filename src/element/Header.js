import React from 'react';
import { format, parse, addDays, startOfWeek, endOfWeek, lastDayOfWeek, startOfMonth, endOfMonth, lastDayOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import styled from 'styled-components';
// import { pl } from 'date-fns/esm/locale';

const Container = styled.div`
  display: grid;
  font-family: 'Lato', sans-serif;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  grid-template-rows: auto;
`;

const Cell = styled.span`
  margin: 0 auto;
`;

const Caption = styled.p`
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
`;

const Description = styled.p`
  font-size: 10px;
  margin: 0;
`;

const timeHeader = <Cell key={99}><Caption></Caption></Cell>;

const generateHeader = ({displayMode, selectedDate, weekStartsOn}) => {
  const start = startOfWeek(selectedDate, {weekStartsOn});
  const end = lastDayOfWeek(selectedDate, {weekStartsOn});
  const headerDays = eachDayOfInterval({start, end});

  switch(displayMode) {
    case 'day':
      return [
        <Cell>
          <Caption>{format(selectedDate, 'EEEE')}</Caption>
          <Description>{format(selectedDate, 'dd.MM.YYYY')}</Description>
        </Cell>];
      break;
    case 'week':
      return headerDays.map((day, index) =>
        <Cell key={index}>
          <Caption>{format(day, 'EEEE')}</Caption>
          <Description>{format(day, 'dd.MM.YYYY')}</Description>
        </Cell>);
      break;
    case 'month':
      return headerDays.map((day, index) =>
        <Cell key={index}>
          <Caption>{format(day, 'EEEE')}</Caption>
        </Cell>);
      break;
    default:
      break;
  }
};

const Header = ({displayMode, selectedDate, weekStartsOn, displayDays, numberOfColumns, subHeader, selectedLocalizations, uniqueLocalization}) => {
  let renderSubHeader = [];

  if(subHeader === 'localization') {
    for (let j = 0; j < selectedLocalizations.length; j++ ) {
      renderSubHeader.push(
        <Cell key={`empty${j}`}></Cell>
      )
    }
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < selectedLocalizations.length; j++ ) {
        renderSubHeader.push(
          <Cell key={`${i}${j}`}>
            <Description>{selectedLocalizations[j]}</Description>
          </Cell>
        )
      }
    }
  }

  let renderedHeader = generateHeader({displayMode, selectedDate, weekStartsOn});
  renderedHeader = renderedHeader.slice(0, displayDays);
  renderedHeader.unshift(timeHeader);

  return (
    <div>
      <Container>
        <Cell>
          <Caption>{format(selectedDate, 'MMMM')}</Caption>
        </Cell>
      </Container>
      <Container columns={numberOfColumns}>
       {renderedHeader}
      </Container>
      <Container columns={numberOfColumns * selectedLocalizations.length}>
       {renderSubHeader}
      </Container>
    </div>

  )
}

export default Header;

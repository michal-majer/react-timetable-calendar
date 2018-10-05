import React from 'react';
import styled from 'styled-components';
import Week from './Week';

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 60px);
  grid-column-gap: 1%;
`;

const Body = (props) => {
  let body;
  let { numberOfColumns, subHeader, selectedLocalizations } = props;
  switch(props.displayMode) {
    case 'day':
      break;
    case 'week':
    body = <Week {...props} resizeActivity={props.resizeActivity} />;
      break;
    case 'month':
      break;
  }

  if(subHeader) {
    numberOfColumns *= selectedLocalizations.length;
  }

  return (
    <StyledBody columns={numberOfColumns} rows={props.numberOfRows}>
        {body}
    </StyledBody>
  );
};

export default Body;

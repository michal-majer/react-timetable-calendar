import React from 'react';
import styled from 'styled-components';
import Week from './Week';

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  grid-template-rows: repeat(${props => props.rows}, 60px);
`;

const Body = (props) => {
  let body;
  switch(props.displayMode) {
    case 'day':
      break;
    case 'week':
    body = <Week {...props} />;
      break;
    case 'month':
      break;
  }

  return (
    <StyledBody columns={props.numberOfColumns} rows={props.numberOfRows}>
        {body}
    </StyledBody>
  );
};

export default Body;

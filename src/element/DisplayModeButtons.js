import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.25em 1em;
  cursor: pointer;
  border: 0;
  background: #FFF;
  transition: color 0.5s ease;

  :disabled {
    border: 2.5px solid #7FDBFF;
    border-radius: 5px;
    color: #7FDBFF;
  }

  :hover {
    color: #7FDBFF;
  }
`;

const avaibleDisplayModes = [
  {
    key: 'day',
    name: 'Day'
  },
  {
    key: 'week',
    name: 'Week'
  },
  {
    key: 'month',
    name: 'Month'
  }
]

const ChangeModeButtons = ({currentDisplayMode, switchDisplayMode, prev, next}) => (
 <div>
  <StyledButton onClick={prev}> {`<`} </StyledButton>
  { avaibleDisplayModes.map(mode =>
        <StyledButton disabled={currentDisplayMode === mode.key ? 'disabled' : ''} key={mode.key} onClick={() => switchDisplayMode(mode.key)}>
          {mode.name}
        </StyledButton>
  )}
  <StyledButton onClick={next}> > </StyledButton>
 </div>
);

export default ChangeModeButtons;

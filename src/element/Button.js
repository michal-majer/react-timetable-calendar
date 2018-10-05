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

const Button = (props) => (
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
)

export default Button;

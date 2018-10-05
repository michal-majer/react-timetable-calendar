import React from 'react';
import styled from 'styled-components';

const StyledTag = styled.div`
  font-family: 'Lato', sans-serif;
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
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
`;

const Tag = (props) => (
  <StyledTag {...props}>
    {props.children}
  </StyledTag>
)

export default Tag;

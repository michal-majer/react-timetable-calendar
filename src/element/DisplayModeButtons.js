import React from 'react';
import styled from 'styled-components';
import Button from './Button';

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
  <Button onClick={prev}> {`<`} </Button>
  { avaibleDisplayModes.map(mode =>
        <Button
          key={mode.key}
          disabled={currentDisplayMode === mode.key ? 'disabled' : ''}
          onClick={() => switchDisplayMode(mode.key)} >
          {mode.name}
        </Button>
  )}
  <Button onClick={next}> > </Button>
 </div>
);

export default ChangeModeButtons;

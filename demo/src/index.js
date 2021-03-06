import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

const activities = [
    {
      name: 'Jazz dla dzieci',
      startAtTime: '8:10',
      endAtTime: '10:00',
      description: 'Michał Majer',
      date: new Date(2018, 9, 9),
      category: 'Dzieci',
      localization: 'Poznań',
      person: 'Michał Majer'
    },
    {
      name: 'Jazz dla dzieci',
      startAtTime: '10:00',
      endAtTime: '10:45',
      description: 'Michał Majer',
      date: new Date(2018, 9, 10),
      category: 'easy',
      category: 'Dzieci',
      localization: 'Poznań',
      person: 'Maciej Majer'
    },
    {
      name: 'Jazz dla dzieci',
      startAtTime: '11:00',
      endAtTime: '12:15',
      description: 'Michał Majer',
      date: new Date(2018, 9, 8),
      category: 'Początkujący',
      localization: 'Poznań',
      person: 'Kinga Majer'
    },
    {
      name: 'Modern dla dzieci',
      startAtTime: '11:05',
      endAtTime: '16:55',
      description: 'Start: 26.09',
      date: new Date(2018, 9, 12),
      category: 'Początkujący',
      localization: 'Poznań',
      person: 'Paulina Majer'
    },
    {
      name: 'Modern dla dzieci',
      startAtTime: '11:00',
      endAtTime: '12:15',
      description: 'Start: 26.09',
      date: new Date(2018, 9, 8),
      category: 'Zaawansowani',
      localization: 'Poznań',
      person: 'Lilianna Majer'
    }
  ];

class Demo extends Component {
  render() {
    return <div>
      <h1>react-timetable-calendar Demo</h1>
      <Example
        activities={activities}
        displayDays={5}
        mode={'display'}
        subHeader={'localization'}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))

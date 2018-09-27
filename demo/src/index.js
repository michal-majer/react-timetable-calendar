import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>react-timetable-calendar Demo</h1>
      <Example
        displayDays={6}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))

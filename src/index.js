import React, {Component} from 'react';
import { addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from 'date-fns';
import styled from 'styled-components';

import AddButton from './element/AddButton';
import Header from './element/Header';
import Body from './element/Body/Body';
import DisplayModeButtons from './element/DisplayModeButtons';
import Styles from './index.css';

const Calendar = styled.div`
  font-family: 'Lato', sans-serif;
`;


export default class extends Component {
  activities = [
      {
        name: 'Jazz dla dzieci',
        startAtTime: '8:10',
        endAtTime: '10:00',
        description: 'Michał Majer',
        date: new Date(2018, 8, 24)
      },
      {
        name: 'Jazz dla dzieci',
        startAtTime: '10:00',
        endAtTime: '10:45',
        description: 'Michał Majer',
        date: new Date(2018, 8, 25)
      },
      {
        name: 'Jazz dla dzieci',
        startAtTime: '11:30',
        endAtTime: '13:30',
        description: 'Michał Majer',
        date: new Date(2018, 8, 26)
      },
      {
        name: 'Modern dla dzieci',
        startAtTime: '13:05',
        endAtTime: '16:55',
        description: 'Start: 26.09',
        date: new Date(2018, 8, 25)
      },
      {
        name: 'Modern dla dzieci',
        startAtTime: '11:30',
        endAtTime: '13:00',
        description: 'Start: 26.09',
        date: new Date(2018, 8, 25)
      },
      {
        name: 'Modern dla dzieci',
        startAtTime: '13:00',
        endAtTime: '14:15',
        description: 'Start: 26.09',
        date: new Date(2018, 8, 28)
      },
      {
        name: 'Modern dla dzieci',
        startAtTime: '16:15',
        endAtTime: '20:00',
        date: new Date(2018, 8, 27)
      }
    ];

  constructor(props) {
    super(props);

    this.state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDate: new Date(),
        displayMode: 'week', //Set default to week
        weekStartsOn: 1, // Start with monday
        displayDays: props.displayDays || 7, //inWeek
        startAtHour: 8,
        endAtHour: 20,
        numberOfRows: 0,
        numberOfColumns: 0,
        timeArray: [],
        activities: this.activities
      };
  }

  componentDidMount = async () => {
    await this.buildTimeArray(); //Must be first
    this.determineNumberOfRowsAndColumns();
  }

  buildTimeArray() {
    let timeArray = [];
    for(let i = this.state.startAtHour; i <= this.state.endAtHour; i++) {
      timeArray.push(`${i}:00`);
    }
    this.setState({timeArray});
  }

  switchDisplayMode = async (displayMode) => {
    await this.setState({displayMode});
    this.determineNumberOfRowsAndColumns();
  }

  addActivity = (activity) => {
    this.setState({activities: this.state.activities.concat(activity)});
  }

  determineNumberOfRowsAndColumns = () => {
    let numberOfColumns, numberOfRows; //Calendar grid
    switch (this.state.displayMode) {
      case 'day':
        numberOfColumns = this.state.displayDays;
        numberOfRows = this.state.timeArray.length;
        break;
      case 'week':
        numberOfColumns = this.state.displayDays + 1; //+1 for time column
        numberOfRows = this.state.timeArray.length;
        break;
      case 'month':
        numberOfColumns = this.state.displayDays + 1;
        numberOfRows = 5;

        break;
      default:
        break;
    }
    this.setState({ numberOfColumns, numberOfRows });
  }

  next = () => {
    let nextSelectedDate;
    switch(this.state.displayMode) {
      case 'day':
        nextSelectedDate = addDays(this.state.selectedDate, 1);
        break;
      case 'week':
        nextSelectedDate = addWeeks(this.state.selectedDate, 1);
        break;
      case 'month':
        nextSelectedDate = addMonths(this.state.selectedDate, 1);
        break;
      default:
        nextSelectedDate = this.state.selectedDate;
        break;
    }
    this.setState({selectedDate: nextSelectedDate});
  }

  prev = () => {
    let nextSelectedDate;
    switch(this.state.displayMode) {
      case 'day':
        nextSelectedDate = subDays(this.state.selectedDate, 1);
        break;
      case 'week':
        nextSelectedDate = subWeeks(this.state.selectedDate, 1);
        break;
      case 'month':
        nextSelectedDate = subMonths(this.state.selectedDate, 1);
        break;
      default:
        nextSelectedDate = this.state.selectedDate;
        break;
    }
    this.setState({selectedDate: nextSelectedDate});
  }

  render() {
    return(
    <Calendar>

      <DisplayModeButtons
        currentDisplayMode={this.state.displayMode}
        switchDisplayMode={this.switchDisplayMode}
        next={this.next}
        prev={this.prev}
      />

      <AddButton
        addActivity={this.addActivity}
      />

      <Header
        {...this.state}
      />

      <Body
        {...this.state}
        activities={this.state.activities}
      />


    </Calendar>
  );
  }
}

import React, {Component} from 'react';
import { addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from 'date-fns';
import { isEqual, uniqBy } from 'lodash';
import styled from 'styled-components';

import AddButton from './element/AddButton';
import Button from './element/Button';
import Tag from './element/Tag';
import Header from './element/Header';
import Body from './element/Body/Body';
import DisplayModeButtons from './element/DisplayModeButtons';
import Styles from './index.css';
//
// import constants from './constants';

const Calendar = styled.div`
  font-family: 'Lato', sans-serif;
  padding: 10px;
`;

const DISPLAY_MODE = 'display';
const EDIT_MODE = 'edit';
const WEEK = 'week';
const TAG_COLORS = ['#f50', '#2db7f5', '#87d068', '#108ee9'];


// const constants = {
//   DISPLAY_MODE: 'display',
//   EDIT_MODE: 'edit'
// };

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
        mode: props.mode || DISPLAY_MODE,
        currentMonth: new Date(),
        selectedDate: new Date(),
        currentDate: new Date(),
        displayMode: props.displayMode || WEEK, //Set default to week
        weekStartsOn: 1, // Start with monday
        displayDays: props.displayDays || 7, //inWeek
        startAtHour: 8,
        endAtHour: 17,
        numberOfRows: 0,
        numberOfColumns: 0,
        timeArray: [],
        subHeader: this.props.subHeader || null,
        activities: this.props.activities || [],
        selectedCategory: null,
        selectedCategories: uniqBy(this.props.activities, 'category').map( activity => activity.category ) || [],
        selectedLocalization: null,
        selectedLocalizations: uniqBy(this.props.activities, 'localization').map( activity => activity.localization ) || [],
        selectedPersones: uniqBy(this.props.activities, 'person').map( activity => activity.person ) || [],
        uniqueCategories: uniqBy(this.props.activities, 'category').map( activity => activity.category ),
        uniqueLocalization: uniqBy(this.props.activities, 'localization').map( activity => activity.localization ),
        uniquePersones: uniqBy(this.props.activities, 'person').map( activity => activity.person )
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

  resizeActivity = (activity, newHeight) => {
     const newActivities = [...this.state.activities];
     const index = newActivities.findIndex(obj => isEqual(obj,activity));

     if(index > -1) {
       const diffHeight = newActivities[index].css.height - newHeight;
       const restOfHeight = diffHeight % 60;
       const oldEndAtTime = newActivities[index].endAtTime.split(':');
       let newMinutes = parseInt(oldEndAtTime[1], 10) - restOfHeight;
       let fullHours = parseInt(newMinutes / 60);

       if(newMinutes < 0){
         fullHours++;
         fullHours *=-1;
       }

       if(newMinutes === 60 || newMinutes === 0) newMinutes = '00';
       if(newMinutes === 5) newMinutes = '05';
       if(newMinutes === -5) newMinutes = '55';

       const newHours = parseInt(oldEndAtTime[0], 10) + fullHours;

       const css = {...newActivities[index].css, height: newHeight};
       let newActivity = {...newActivities[index], endAtTime: `${newHours}:${newMinutes}`, css};
       newActivities[index] = {...newActivity};
       this.setState({ activities: newActivities });
     }
  }

  editModeHeader = () => (
    <div>
      <DisplayModeButtons
        currentDisplayMode={this.state.displayMode}
        switchDisplayMode={this.switchDisplayMode}
        next={this.next}
        prev={this.prev}
      />
      <AddButton addActivity={this.addActivity} />
    </div>
  )

  displayModeElements = () => {
    switch(this.state.mode) {
      case DISPLAY_MODE:
        break;
      case EDIT_MODE:
        return this.editModeHeader();
      default:
        break;
    }
  }

  tooggleFilter = (table, element) => {

    let newTable = table;
    const index = newTable.indexOf(element);
    if (index > -1 && table.length > 1 ) {
      newTable.splice(index, 1);
    } else if (index === -1) {
      newTable.push(element);
    }
    return newTable;
  }

  toogleCategories = (table, element) => {
    const newSelectedCategories = this.tooggleFilter(table, element);
    this.setState({
      selectedCategories: newSelectedCategories
    });
  }

  toogleLocalizations = (table, element) => {
    this.setState({
      selectedLocalizations: this.tooggleFilter(table, element)
    });
  }

  tooglePersones = (table, element) => {
    this.setState({
      selectedPersones: this.tooggleFilter(table, element)
    })
  }

  render() {
    const { selectedCategory, selectedCategories, uniqueCategories, selectedLocalization, selectedLocalizations, uniqueLocalization, uniquePersones, selectedPersones } = this.state;

    //Smart grey-out empty tags
    const categoriesInSelectedLocalization = this.state.activities.filter(activity => selectedLocalizations.indexOf(activity.localization) > -1  && selectedPersones.indexOf(activity.person) > -1);
    const uniqueCategoriesInSelectedLocalization = uniqBy(categoriesInSelectedLocalization, 'category').map(activity => activity.category);
    const personesInSelectedLocalization = this.state.activities.filter(activity => selectedLocalizations.indexOf(activity.localization) > -1 && selectedCategories.indexOf(activity.category) > -1);
    const uniquePersonesInSelectedLocalization = uniqBy(personesInSelectedLocalization, 'person').map(activity => activity.person);

    const localizationForSelections = this.state.activities.filter(activity => selectedCategories.indexOf(activity.category) > -1 && selectedPersones.indexOf(activity.person) > -1);
    const uniqueLocalizationForSelections = uniqBy(localizationForSelections, 'localization').map(activity => activity.localization);

    const categoryTags = uniqueCategories.map((category, index) =>
      <Tag
        color={uniqueCategoriesInSelectedLocalization.indexOf(category) === -1 ? 'grey' : TAG_COLORS[index]}
        checked={ selectedCategories.indexOf(category) > -1 ? true : false }
        key={category}
        onClick={() => this.toogleCategories(selectedCategories, category)} >
        {category}
      </Tag>
    );

    const localizationButtons = uniqueLocalization.map(localization =>
      <Tag
        color={uniqueLocalizationForSelections.indexOf(localization) === -1 ? 'grey' : '#2db7f5'}
        checked={ selectedLocalizations.indexOf(localization) > -1 ? true : false }
        key={localization} onClick={() => this.toogleLocalizations(selectedLocalizations, localization)} >
        {localization}
      </Tag>
    );

    const personesButtons = uniquePersones.map(person =>
      <Tag
        color={uniquePersonesInSelectedLocalization.indexOf(person) === -1 ? 'grey' : '#108ee9'}
        checked={ selectedPersones.indexOf(person) > -1 ? true : false }
        key={person} onClick={() => this.tooglePersones(selectedPersones, person)} >
        {person}
      </Tag>
    );

    return (
        <Calendar>
          {this.displayModeElements()}

          <div>
            <h6 style={{marginRight: '8px', display: 'inline'}}>Miejsca zajęć:</h6>
            {localizationButtons}
          </div>

          <div>
            <h6 style={{marginRight: '8px', display: 'inline'}}>Kategorie:</h6>
            {categoryTags}
          </div>

          <div>
            <h6 style={{marginRight: '8px', display: 'inline'}}>Prowadzący:</h6>
            {personesButtons}
          </div>


          <Header {...this.state} />

          <Body
            {...this.state}
            resizeActivity={this.resizeActivity}
          />
        </Calendar>
  );
  }
}

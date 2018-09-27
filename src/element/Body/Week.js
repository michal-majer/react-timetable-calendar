import React from 'react';
import { startOfWeek, lastDayOfWeek, eachDayOfInterval, isSameDay  } from 'date-fns';
import styled from 'styled-components';
import ActivityCard from '../ActivityCard';

const CellWeek = styled.div`
  border-top: 1px dashed rgb(220,220,220, 0.8);
  padding: 0 2%;
  grid-row: span ${props => props.rowSpan || 1};
  margin-top: 1px;
  position: relative;
  transition: 0.3s ease;
  z-index: 0;
`;

const CellTime = styled.div`
  color: grey;
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
  margin-top: -7.5px;
  padding: 0 5%;
`;

const generateWeekBody = ({selectedDate, weekStartsOn, timeArray, displayDays, activities}) => {
  let cells = [];
  let spanCordinates = [];
  const start = startOfWeek(selectedDate, {weekStartsOn});
  const end = lastDayOfWeek(selectedDate, {weekStartsOn});
  const headerDays = eachDayOfInterval({start, end});

  let activitiesInThisWeek = [];
  for (let [index, dayOfWeek] of headerDays.entries()) {
    for (let activity of activities) {
      if (isSameDay(activity.date, dayOfWeek)) {
        activitiesInThisWeek.push(activity)
      }
    }
  }

  for (let [index, dayOfWeek] of headerDays.entries()) {
      if (index > displayDays) { break; }
      for (let activity of activitiesInThisWeek) {
        if (isSameDay(activity.date, dayOfWeek)) {
          //Time calculate
          const splitedStartAtTime = activity.startAtTime.split(':');
          const splitedEndAtTime = activity.endAtTime.split(':');
          const startHour = splitedStartAtTime[0] + ':00';
          const endHour = splitedEndAtTime[0] + ':00';
          let offset, prefix;

          //Set position of ActivityCard on grid
          activity.startX = timeArray.indexOf(startHour);
          activity.endX = timeArray.indexOf(endHour);
          activity.span = activity.endX - activity.startX;

          //Padding calculate
          if(splitedStartAtTime[1] !== '00' && splitedEndAtTime[1] !== '00' ) {
            prefix = parseInt(splitedStartAtTime[1], 10);
            offset = parseInt(splitedEndAtTime[1], 10);
            activity.css = {
              height: (activity.span) * 60 - prefix + offset,
              marginTop: prefix
            };
            activity.span++;
            activity.endX++;
          } else if (splitedStartAtTime[1] === '00' && splitedEndAtTime[1] === '00' ) {
            activity.css = {
              height: (activity.span) * 60,
              marginTop: 0
            };
          } else if(splitedStartAtTime[1] !== '00') {
              offset = parseInt(splitedStartAtTime[1], 10);
              activity.css = {
                height: (activity.span * 60) - offset,
                marginTop: offset
              };
              console.log(offset, activity.span);
          } else {
              offset = parseInt(splitedEndAtTime[1], 10);
              activity.css = {
                height: (activity.span * 60) + offset,
                marginTop: 0
              };
          }

          activity.css.height--;

          //Set column
          activity.y = index;

          //Recalculate span (size of ActivityCard on grid)
          for(let i = activity.startX; i < activity.endX - 1; i++) {
            spanCordinates.push({x: i + 1, y: activity.y});
          }
        }
      }
  }

  for (let index = 0; index < timeArray.length; index++) {
    cells.push(
      <CellTime key={index}>
        {timeArray[index]}
      </CellTime>
    );

    for (let i = 0; i < displayDays; i++) {
        const checkActivity = activitiesInThisWeek.filter(activity => activity.startX === index && i === activity.y );

        //Reduce - more than one activity in one time
        if(checkActivity.length > 0) {
          let span = checkActivity[0].span;
          if(checkActivity.length > 1) {
            span += checkActivity[1].span;
          }

          cells.push(
            <CellWeek key={`activity${index}${i}`} rowSpan={span}>
              { checkActivity.map((activity, index) => <ActivityCard key={index} activity={activity} />)}
            </CellWeek>
          );
          span = 0;
        } else {
          const checkRowSpan = spanCordinates.filter(obj => obj.x === index && obj.y === i );
          if (checkRowSpan.length !== 1) {
            cells.push(<CellWeek key={`activity${index}${i}`} />)
          }
        }
    }
  }

  return cells;
}

const Week = (props) => {
  return generateWeekBody(props);
}

export default Week;

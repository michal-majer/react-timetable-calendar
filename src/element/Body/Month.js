
// const generateMonthBody = ({selectedDate, weekStartsOn}) => {
//   const monthStart = startOfMonth(selectedDate, {weekStartsOn});
//   const monthEnd = endOfMonth(monthStart, {weekStartsOn});
//   const startDate = startOfWeek(monthStart, {weekStartsOn});
//   const endDate = endOfWeek(monthEnd, {weekStartsOn});
//   const dateFormat = "dd";
//
//   let days = [];
//   let day = startDate;
//   let formattedDate = "";
//   while (day <= endDate) {
//     for (let i = 0; i < 7; i++) {
//       formattedDate = format(day, dateFormat);
//       const cloneDay = day;
//       days.push(
//         <CellMonth key={day}>
//           {formattedDate}
//         </CellMonth>
//       );
//       day = addDays(day, 1);
//     }
//   }
//   return days;
// }

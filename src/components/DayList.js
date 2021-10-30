import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  // let arrayToDisplay = [];

  // for (let i = 0; i < props.days.length; i++) {
  //   arrayToDisplay.push(DayListItem(props.days[i]));
  // }

  const arrayOfDays = props.days.map((x) => {

    // console.log(props)

    return (<DayListItem key={x.id} name={x.name} spots={x.spots} selected={x.name === props.value} setDay={props.onChange} />);
  });

  return (
    <ul>{arrayOfDays}</ul>
  );
}


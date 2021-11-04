import React from "react";
import DayListItem from "components/DayListItem.js";

export default function DayList(props) {

  const arrayOfDays = props.days.map((x) => {

    return (<DayListItem key={x.id} name={x.name} spots={x.spots} selected={x.name === props.value} setDay={props.onChange} />);
  });

  return (
    <ul>{arrayOfDays}</ul>
  );
}


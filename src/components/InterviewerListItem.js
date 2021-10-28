import React, { useState } from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const [interviewer, setInterviewer] = useState("1");

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  })

  return (
    <li className={interviewerClass} onClick={() => setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

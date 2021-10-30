import React from "react";
//why does it also need components/
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {

  const formatAppointment = function (time) {

    if (props.time) {
      return `Appointment at ${props.time}`;
    }
    return "No Appointments"
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : < Empty />}
    </article>
  );
}

import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const updatingDay = function (newDay) {
    let newState = {
      ...state,
      day: newDay
    };
    setState((prev) => { return newState })
  };

  const updatingDaysAndAppointments = function (newAppointments, newDays, newInterviewers) {
    let newState = {
      ...state,
      days: newDays,
      appointments: newAppointments,
      interviewers: newInterviewers
    };
    setState((prev) => { return newState });
  };

  useEffect(() => {
    const baseUrl = "http://localhost:8001/api"
    const days = axios.get(`${baseUrl}/days`);
    const appointments = axios.get(`${baseUrl}/appointments`);
    const interviewers = axios.get(`${baseUrl}/interviewers`);

    const promises = [days, appointments, interviewers]

    Promise.all(promises)
      .then((response) => {

        let objectToSearch = { days: response[0].data, appointments: response[1].data, interviewers: response[2].data };
        let dailyAppointments = getAppointmentsForDay(objectToSearch, state.day)

        const scheduleElements = dailyAppointments.map((appointment) => {

          const interview = getInterview(objectToSearch, appointment.interview);
          return <Appointment key={appointment.id} time={appointment.time} interview={interview} />;
        })

        updatingDaysAndAppointments(scheduleElements, response[0].data, response[2].data);
      });

  }, [state.day]);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={updatingDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {state.appointments}
      </section>
    </main>
  );
}

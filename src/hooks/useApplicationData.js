import axios from "axios";
import { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";

const useApplicationData = function () {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = function (newDay) {
    let newState = {
      ...state,
      day: newDay
    };
    setState(() => { return newState })
  }

  // gets days, appointments, interviewers from api server to be used to display to user
  useEffect(() => {
    const days = axios.get(`api/days`);
    const appointments = axios.get(`api/appointments`);
    const interviewers = axios.get(`api/interviewers`);
    const promises = [days, appointments, interviewers]
    Promise.all(promises)
      .then((response) => {
        let objectToSearch = { days: response[0].data, appointments: response[1].data, interviewers: response[2].data };
        setState(prev => ({ ...prev, ...objectToSearch }))
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const baseUrl = "http://localhost:8001/api/appointments/"

    const promise = axios({
      method: 'put',
      url: `${baseUrl}${id}`,
      data: {
        interview: interview
      }
    }).then(() => {
      calculateSpots(state, appointments, setState);
    })
    return promise;
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const baseUrl = "http://localhost:8001/api/appointments/"
    const promise = axios({
      method: 'delete',
      url: `${baseUrl}${id}`,
      data: {
        interview: null
      }
    }).then((res) => {
      calculateSpots(state, appointments, setState);
    })
    return promise;
  }

  return { state, setDay, bookInterview, cancelInterview };
}
export default useApplicationData;

const calculateSpots = function (state, appointments, setState) {
  let tempState = { ...state, appointments } // used to not modify original state

  let spots = 0;
  for (const appointment of getAppointmentsForDay(tempState, state.day)) {
    if (appointment.interview === null) {
      spots++;
    }
  }

  let obj = tempState.days.find((d) => d.name === state.day) //used to directly modify tempState
  obj.spots = spots;

  setState({
    ...state,
    ...tempState
  });
}
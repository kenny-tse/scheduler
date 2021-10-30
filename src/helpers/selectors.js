const getAppointmentsForDay = function (state, day) {

  let appointmentInterested = [];
  for (let i = 0; i < state.days.length; i++) {

    if (state.days[i].name === day) {
      appointmentInterested = state.days[i].appointments;
    }
  }

  let appointmentArray = [];
  for (let i = 0; i < appointmentInterested.length; i++) {
    appointmentArray.push(state.appointments[`${appointmentInterested[i]}`]);
  }

  return appointmentArray;
};

const getInterview = function (state, interview) {

  if (!interview) {
    return null;
  }

  let id = interview.interviewer;

  let interviewToReturn = {
    ...interview,
    interviewer: state.interviewers[`${id}`]
  }

  return interviewToReturn;
};

export { getAppointmentsForDay, getInterview };

//why cant i export function from top
// module.exports = { getAppointmentsForDay, getInterview };


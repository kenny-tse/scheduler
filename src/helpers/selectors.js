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
  // alternate solution from mentor
  // const found = state.days.find(d => day === d.name);
  // if (state.days.length === 0 || found === undefined) return [];
  // return found.appointments.map(id => state.appointments[id]);
};

const getInterviewersForDay = function (state, day) {

  let interviewerId = [];
  for (let i = 0; i < state.days.length; i++) {
    if (state.days[i].name === day) {
      interviewerId = state.days[i].interviewers;
    }
  }

  let interviewersArray = [];
  for (let i = 0; i < interviewerId.length; i++) {
    interviewersArray.push(state.interviewers[`${interviewerId[i]}`]);
  }

  return interviewersArray;
  // alternate solution from mentor
  // const found = state.days.find(d => day === d.name);
  // if (state.days.length === 0 || found === undefined) return [];
  // return found.interviewers.map(id => state.interviewers[id]);
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
  // return (
  //   interview && {
  //     ...interview,
  //     interviewer: state.interviewers[interview.interviewer]
  //   }
  // );
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };

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

  // const found = state.days.find(d => day === d.name);
  // if (state.days.length === 0 || found === undefined) return [];
  // return found.appointments.map(id => state.appointments[id]);
};

const getInterviewersForDay = function (state, day) {

  // let appointmentInterested = [];
  // for (let i = 0; i < state.days.length; i++) {
  //   if (state.days[i].name === day) {
  //     appointmentInterested = state.days[i].appointments;
  //   }
  // }

  // let interviwersArray = [];
  // for (let i = 0; i < appointmentInterested.length; i++) {
  //   if (state.appointments[`${appointmentInterested[i]}`].interview !== null) {
  //     interviwersArray.push(state.appointments[`${appointmentInterested[i]}`].interview.interviewer);
  //   }
  // }

  // let interviewersToReturn = [];

  // for (let i = 0; i < interviwersArray.length; i++) {
  //   interviewersToReturn.push(state.interviewers[`${interviwersArray[i]}`])
  // }

  // return interviewersToReturn;

  const found = state.days.find(d => day === d.name);

  // console.log(found)
  if (state.days.length === 0 || found === undefined) return [];
  return found.interviewers.map(id => state.interviewers[id]);


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

//why cant i export function from top
// module.exports = { getAppointmentsForDay, getInterview };


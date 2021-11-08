import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  function validate() {
    // user needs to put student name in (cannot be nothing)
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    // user needs to select interviewer
    if (!interviewer) {
      setError("You need to select an interviewer!");
      return;
    }

    // resets error so it doens't appear again after error is resolved
    setError("");
    props.onSave(student, interviewer);
  }

  const cancel = function () {
    setStudent(() => ""); //sets student to nothing so user sees a blank text area after cancel
    setInterviewer(() => ""); //sets interview to unselected so user sees no instructors selected after cancel
    setError(""); //sets error to nothing so user doesnt see error messsage after cancel
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            onChange={(event) => { setStudent(event.target.value) }}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student} // lets the user see what they type
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(event) => setInterviewer(event)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => { validate() }}>Save</Button>
        </section>
      </section>
    </main>
  );
}

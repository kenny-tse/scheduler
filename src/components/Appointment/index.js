import React from "react";
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    if (name && interviewer) {

      const interview = {
        student: name,
        interviewer
      };

      // show saving screen so user gets feedback upon submission
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(error => transition(ERROR_SAVE, true)); //user will need to know the save to the server was unsuccessful
    }
  }

  function remove() {
    // show deleting screen so user gets feedback upon submission
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true)); //user will need to know the deletion to the server was unsuccessful
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => { transition(CONFIRMING) }}
          onEdit={() => (transition(EDIT))}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && (
        <Status message={"Saving..."} />
      )}
      {mode === DELETING && (
        <Status message={"Deleting..."} />
      )}
      {mode === CONFIRMING && (
        <Confirm onCancel={back} onConfirm={remove} message={"Delete interview appointment?"} />
      )}
      {mode === EDIT && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id} />
      )}
      {mode === ERROR_SAVE && (
        <Error message={"Error saving interview!"} onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message={"Error deleting interview!"} onClose={back} />
      )}
    </article>
  );
}

import { useState } from "react";

const useVisualMode = function (initial) {

  const [history, setHistory] = useState([initial])
  const [mode, setMode] = useState(initial);

  const transition = function (valueToChangeTo, replace = false) {

    if (replace === true) {
      setHistory((prev) => {
        let historyCopy = [...prev];
        historyCopy.pop();
        historyCopy.push(valueToChangeTo);
        return historyCopy;
      })
    } else {
      setHistory((prev) => {
        let historyCopy = [...prev];
        historyCopy.push(valueToChangeTo);
        return historyCopy;
      })
    }

    setMode(() => {
      return valueToChangeTo;
    })

  }

  const back = function () {

    let historyCopyForSetMode = [];

    if (history.length > 1) {
      setHistory((prev) => {
        let historyCopy = [...prev];
        historyCopy.pop();
        historyCopyForSetMode = historyCopy;
        return historyCopy
      })
    } else {
      historyCopyForSetMode = history;
    }

    setMode(() => {
      return historyCopyForSetMode[historyCopyForSetMode.length - 1];
    })
  }

  return { mode, transition, back };
};

export default useVisualMode;


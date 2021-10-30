import React, { useState } from "react";

const useVisualMode = function (initial) {

  const [mode, setMode] = useState(initial);

  return { mode };
};

export default useVisualMode;
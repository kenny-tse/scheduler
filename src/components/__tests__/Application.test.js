import React from "react";
import Application from "components/Application";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
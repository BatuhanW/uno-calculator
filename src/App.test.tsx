import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  describe("Snapshot", () => {
    it("should match snapshot", async () => {
      const { container } = render(<App />);

      expect(container).toMatchSnapshot();
    });
  });
});

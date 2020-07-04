import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { RecoilRoot } from "recoil";

describe("App", () => {
  describe("Snapshot", () => {
    it("should match snapshot", async () => {
      const { container } = render(
        <RecoilRoot>
          <App />
        </RecoilRoot>
      );

      expect(container).toMatchSnapshot();
    });
  });
});

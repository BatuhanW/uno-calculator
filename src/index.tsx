import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RecoilRoot } from "recoil";
import { playersState, roundState, pointsState } from "./atoms/states";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot
      initializeState={(snapshot) => {
        snapshot.set(
          playersState,
          JSON.parse(localStorage.getItem("players") || "{}").contents
        );

        snapshot.set(
          roundState,
          JSON.parse(localStorage.getItem("round") || "{}").contents
        );

        snapshot.set(
          pointsState,
          JSON.parse(localStorage.getItem("points") || "{}").contents
        );
      }}
    >
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

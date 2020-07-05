import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { RecoilRoot } from "recoil";
import { stateMap } from "./atoms/states";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot
      initializeState={(snapshot) => {
        Object.entries(stateMap).map(([name, state]) => {
          const { contents } = JSON.parse(localStorage.getItem(name) || "{}");

          if (contents) {
            snapshot.set(state, contents);
          }
        });
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

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import filmReducer from "./reducers/filmReducer";
import rootReducer from "./reducers/index.js";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const saveState = (state) => {
  if (state.film.length !== 0) {
    localStorage.setItem("state", JSON.stringify(state));
  }
};

const getState = () => {
  try {
    const s = localStorage.getItem("state");
    if (s === null) return undefined;
    return JSON.parse(s);
  } catch (e) {
    return undefined;
  }
};

const initialState = getState();

const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhacer(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveState({
    film: store.getState().film,
  });
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

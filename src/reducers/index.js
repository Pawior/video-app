import { combineReducers } from "redux";
import filmReducer from "./filmReducer.js";

// const initState = {  TO TYLKO DO NAUKI
//   name: "",
//   isLogged: false,
// };

// const userReducer = (state = initState, action) => {
//   switch (action.type) {
//     default:
//       return { ...state };
//   }
// };

const rootReducer = combineReducers({
  film: filmReducer,
});

export default rootReducer;

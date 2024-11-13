import { combineReducers } from "redux";

import countriesReducer from "./countries/slice";


const rootReducer = combineReducers({
  countries: countriesReducer,
});

export default rootReducer;
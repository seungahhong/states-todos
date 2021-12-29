import { combineReducers } from "redux";
import reducers from "../reducers";

const rootReducers = () => combineReducers({
  'todos': reducers.todos
});

export default rootReducers;

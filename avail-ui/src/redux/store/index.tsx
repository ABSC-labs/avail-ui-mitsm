import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import * as hist from "history";

const createBrowserHistory = hist.createBrowserHistory;
const history = createBrowserHistory();
const rootReducer = combineReducers({
  ...reducers,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState?: AppState) {
  const enhancers: any[] = [];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk), ...enhancers)
  );
}

export { history };

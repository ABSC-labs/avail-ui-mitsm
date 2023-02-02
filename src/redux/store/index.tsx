import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import * as hist from 'history';
import reducers from '../reducers';

const { createBrowserHistory } = hist;
const history = createBrowserHistory();
const rootReducer = combineReducers({
  ...reducers,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState?: AppState) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const enhancers: any[] = [];

  return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), ...enhancers));
}

export { history };

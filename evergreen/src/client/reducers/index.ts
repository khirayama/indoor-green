import { combineReducers } from 'redux';

import { Config } from 'yggdrasil';

import { reducer as configReducer } from './config';
import { State as ResourcesState, reducer as resourcesReducer } from './resources';
import { reducer as UIReducer, State as UIState } from './ui';

export interface State {
  config: Config | null;
  resources: ResourcesState;
  ui: UIState;
}

export const reducer = combineReducers({
  config: configReducer,
  resources: resourcesReducer,
  ui: UIReducer,
});

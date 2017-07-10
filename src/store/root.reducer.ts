import { AppState } from './app-state.type';
import { combineReducers } from './combine-reducers';

import { keyboardReducer } from '../keyboard/keyboard.reducer';
import { playerReducer } from '../player/player.reducer';

export const rootReducer = combineReducers<AppState>({
  keyboard: keyboardReducer,
  player: playerReducer,
});

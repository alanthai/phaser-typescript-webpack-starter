import { Action } from '../store/action.type';

import { KeyboardActions } from './keyboard.actions';
import { Key } from './key.type';

export type KeyboardState = Key[];

const initialKeyboardState: KeyboardState = [];

export function keyboardReducer(
  state: KeyboardState = initialKeyboardState,
  action: Action<Key>,
): KeyboardState {
  switch (action.type) {
    case KeyboardActions.KEY_DOWN:
      if (state.indexOf(action.payload) === -1) {
        return [...state, action.payload];
      } else {
        return state;
      }
    case KeyboardActions.KEY_UP:
      return state.filter(key => key !== action.payload);
    default:
      return state;
  }
}

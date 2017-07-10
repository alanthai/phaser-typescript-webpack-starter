import { Action } from '../store/action.type';
import { Key } from './key.type';

const KEY_UP = 'KEYBOARD::KEY_UP';
const KEY_DOWN = 'KEYBOARD::KEY_DOWN';

function keyUp(key: Key): Action<Key> {
  return {
    type: KEY_UP,
    payload: key,
  };
}

function keyDown(key: Key): Action<Key> {
  return {
    type: KEY_DOWN,
    payload: key,
  };
}

export const KeyboardActions = {
  KEY_UP,
  KEY_DOWN,

  keyUp,
  keyDown,
};

import { Action } from '../store/action.type';

import { PlayerActions } from './player.actions';

interface PlayerState {
  gold: number;
}

const initialPlayerState = {
  gold: 0,
};

export function playerReducer(
  state: PlayerState = initialPlayerState,
  action: Action<any>,
): PlayerState {
  switch (action.type) {
    case PlayerActions.ADD_GOLD:
      return { ...state, gold: state.gold + action.payload };
    default:
      return state;
  }
}

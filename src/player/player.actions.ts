import { Action } from '../store/action.type';

export const ADD_GOLD = 'PLAYER::ADD_GOLD';

function addGold(amount: number): Action<number> {
  return {
    type: ADD_GOLD,
    payload: amount,
  };
}

export const PlayerActions = {
  ADD_GOLD,

  addGold,
};

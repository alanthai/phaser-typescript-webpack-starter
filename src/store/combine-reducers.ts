import { Action } from './action.type';

interface Reducers {
  [name: string]: Function;
}

export function combineReducers<T>(reducers: Reducers) {
  return (state: T | undefined, action: Action<any>): T => {
    const newState = {};

    for (const key in reducers) {
      if (reducers.hasOwnProperty(key)) {
        const oldState = state || {};
        newState[key] = reducers[key](oldState[key], action);
      }
    }

    return newState as T;
  };
}

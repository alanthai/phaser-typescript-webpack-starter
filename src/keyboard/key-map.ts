import { Key } from './key.type';
import { ActorAction } from '../actor-actions/actor-action.type';

interface KeyMap {
  [key: number]: ActorAction;
}

export const DEFAULT_KEY_MAP: KeyMap = {
  [Key.Up]: ActorAction.Jump,
  [Key.Left]: ActorAction.MoveLeft,
  [Key.Right]: ActorAction.MoveRight,

  [Key.Space]: ActorAction.Jump,
  [Key.A]: ActorAction.MoveLeft,
  [Key.D]: ActorAction.MoveRight,
};

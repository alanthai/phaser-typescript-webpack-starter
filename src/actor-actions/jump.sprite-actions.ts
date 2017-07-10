import { Sprite } from '../units/sprite';
import { ActorAction } from './actor-action.type';
import { UnitActions } from './unit-actions.type';

export const jump: UnitActions<Sprite> = {
  [ActorAction.Jump](sprite: Sprite): void {
    sprite.body.velocity.y = -sprite.attributes.speed.y;
  },
};

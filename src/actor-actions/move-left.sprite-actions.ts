import { Sprite } from '../units/sprite';
import { ActorAction } from './actor-action.type';
import { UnitActions } from './unit-actions.type';

export const moveLeft: UnitActions<Sprite> = {
  [ActorAction.MoveLeft](sprite: Sprite): void {
    sprite.body.velocity.x = -sprite.attributes.speed.x;

    sprite.animations.play('left');
  },
};

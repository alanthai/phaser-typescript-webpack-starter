import { Sprite } from '../units/sprite';
import { ActorAction } from './actor-action.type';
import { UnitActions } from './unit-actions.type';

export const moveRight: UnitActions<Sprite> = {
  [ActorAction.MoveRight](sprite: Sprite): void {
    sprite.body.velocity.x = sprite.attributes.speed.x;

    sprite.animations.play('right');
  },
};

import { Sprite } from '../units/sprite';
import { ActorAction } from './actor-action.type';
import { UnitActions } from './unit-actions.type';

export const idle: UnitActions<Sprite> = {
  [ActorAction.Idle](sprite: Sprite): void {
    sprite.body.velocity.x = 0;

    sprite.animations.play('idle');
  },
};

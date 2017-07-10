import * as Phaser from 'phaser';

import { ActorAction } from '../actor-actions/actor-action.type';
import { Actor } from './actor';
import { Unit } from '../units/unit.type';
import { UnitType } from '../units/unit-type.type';
import { Sprite } from '../units/sprite';

import { DEFAULT_KEY_MAP } from '../keyboard/key-map';
import { store } from '../store/store';

export class KeyboardActor extends Actor {
  constructor(game: Phaser.Game, unit: Unit) {
    super(game, unit);
  }

  getActions(): ActorAction[] {
    const actions: ActorAction[] = [];

    const mappedActions = store
      .getState()
      .keyboard.map(key => DEFAULT_KEY_MAP[key]);
    const actionSet = new Set<ActorAction>(mappedActions);

    if (
      actionSet.has(ActorAction.MoveLeft) &&
      actionSet.has(ActorAction.MoveRight)
    ) {
      actions.push(ActorAction.Idle);
    } else if (actionSet.has(ActorAction.MoveLeft)) {
      actions.push(ActorAction.MoveLeft);
    } else if (actionSet.has(ActorAction.MoveRight)) {
      actions.push(ActorAction.MoveRight);
    } else {
      actions.push(ActorAction.Idle);
    }

    const platforms = this.getUnitsOfType(UnitType.Platform);
    const isPlatformHit = platforms.some(platform =>
      this.game.physics.arcade.collide(platform, this.unit),
    );

    if (
      actionSet.has(ActorAction.Jump) &&
      isPlatformHit &&
      (this.unit as Sprite).body.touching.down
    ) {
      actions.push(ActorAction.Jump);
    }

    return actions;
  }
}

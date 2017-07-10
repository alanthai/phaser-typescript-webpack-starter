import * as Phaser from 'phaser';

import { ActorAction } from '../actor-actions/actor-action.type';
import { Actor } from './actor';
import { Unit } from '../units/unit.type';

export class DummyActor extends Actor {
  constructor(game: Phaser.Game, unit: Unit) {
    super(game, unit);
  }

  getActions(): ActorAction[] {
    return [];
  }
}

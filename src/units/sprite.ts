import * as Phaser from 'phaser';

import { Attributes, createDefaultAttributes } from '../actors/attributes.type';
import { Actor } from '../actors/actor';
import { UnitType } from './unit-type.type';
import { ActorAction } from '../actor-actions/actor-action.type';
import { UnitActions } from '../actor-actions/unit-actions.type';
import { Unit } from './unit.type';
import { ActorConstructor } from '../actors/actor-constructor.type';
import { DummyActor } from '../actors/dummy.actor';

interface SpriteState {
  position: { x: number; y: number };
  key: string;
  frame?: number | string;
}

export class Sprite extends Phaser.Sprite implements Unit {
  actor: Actor;
  actions: UnitActions<Sprite> = {};
  unitType: UnitType;

  constructor(
    game: Phaser.Game,
    public state: SpriteState,
    public attributes: Attributes = createDefaultAttributes(),
    actorClass: ActorConstructor = DummyActor,
  ) {
    super(game, state.position.x, state.position.y, state.key, state.frame);

    this.actor = new actorClass(game, this);
  }

  update() {
    super.update();

    this.actor.getActions().forEach((action: ActorAction) => {
      const performAction = this.actions[action] || (() => undefined);
      performAction(this);
    });
  }
}

import * as Phaser from 'phaser';

import { Unit } from './unit.type';
import { UnitType } from './unit-type.type';
import { Sprite } from './sprite';

export class Group extends Phaser.Group implements Unit {
  unitType: UnitType;

  create(
    x: number,
    y: number,
    key: string,
    frame?: number | string,
    exists: boolean = true,
    index?: number,
  ) {
    const state = { position: { x, y }, key, frame };

    const child = new Sprite(this.game, state);

    child.exists = exists;
    child.visible = exists;
    child.alive = exists;

    return this.add(child, false, index);
  }
}

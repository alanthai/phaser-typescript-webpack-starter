import * as Phaser from 'phaser';

import { UnitType } from '../units/unit-type.type';
import { instanceOfUnit, Unit } from '../units/unit.type';
import { ActorAction } from '../actor-actions/actor-action.type';
import { Group } from '../units/group';

export abstract class Actor {
  constructor(protected game: Phaser.Game, protected unit: Unit) {}

  abstract getActions(): ActorAction[];

  getUnitsOfType(unitType: UnitType): Unit[] {
    const queue = this.game.world.children.slice();
    const units = [];

    while (queue.length) {
      const unit = queue.pop();

      if (unit instanceof Group && !unit.unitType) {
        queue.push(...unit.children);
      } else if (instanceOfUnit(unit) && unit.unitType === unitType) {
        units.push(unit);
      }
    }

    return units;
  }
}

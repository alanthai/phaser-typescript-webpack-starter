import * as Phaser from 'phaser';

import { Sprite } from './sprite';
import { KeyboardActor } from '../actors/keyboard.actor';
import { walk } from '../actor-actions/walk.sprite-actions';
import { jump } from '../actor-actions/jump.sprite-actions';
import { UnitType } from './unit-type.type';
import { idle } from '../actor-actions/idle.sprite-actions';

export class HeroSprite extends Sprite {
  actions = {
    ...idle,
    ...walk,
    ...jump,
  };

  unitType = UnitType.Player;

  constructor(game: Phaser.Game) {
    super(
      game,
      {
        position: { x: 32, y: game.world.height - 150 },
        key: 'dude',
      },
      {
        speed: { x: 150, y: 350 },
      },
      KeyboardActor,
    );

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this);

    //  Player physics properties. Give the little guy a slight bounce.
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 400;
    this.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.animations.add('idle', [4]);
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);
  }
}

import * as Phaser from 'phaser';

import { Screen } from './screen.type';

export class SplashScreen extends Phaser.State {
  preload() {
    this.game.load.image('sky', 'assets/images/sky.png');
    this.game.load.image('ground', 'assets/images/platform.png');
    this.game.load.image('star', 'assets/images/star.png');
    this.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
  }

  create() {
    this.game.state.start(Screen.Game as string);
  }
}
